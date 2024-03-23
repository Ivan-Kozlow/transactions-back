import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserService } from 'src/user/user.service'

import { IUser } from 'src/types/types'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const user = await this.userService.findOne(email)
		const passwordIsMatch = await compare(pass, user.password)
		if (user && passwordIsMatch) return user
		else throw new UnauthorizedException('Wrong password or email')
	}

	async login(user: IUser) {
		const { id, email } = user
		return { id, email, token: this.jwtService.sign({ id, email }) }
	}
}
