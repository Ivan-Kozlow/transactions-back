import { Repository } from 'typeorm'
import { genSalt, hash } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable } from '@nestjs/common'

import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const isUserExist = await this.userRepository.findOne({ where: { email: createUserDto.email } })
		if (isUserExist) throw new BadRequestException('Check that your email or password is correct')

		const salt = await genSalt(7)
		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await hash(createUserDto.password, salt),
		})

		const token = this.jwtService.sign({ id: user.id, email: user.email })

		return { user, token }
	}

	async findOne(email: UserEntity['email']) {
		const findUser = await this.userRepository.findOne({ where: { email } })
		if (!findUser) throw new BadRequestException('Wrong password or email')
		return findUser
	}
}
