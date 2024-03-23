import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { UserService } from './user.service'

import { UserController } from './user.controller'
import { UserEntity } from './entities/user.entity'
import { TransactionEntity } from 'src/transaction/entities/transaction.entity'
import { CategoryEntity } from 'src/category/entities/category.entity'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		TypeOrmModule.forFeature([UserEntity, CategoryEntity, TransactionEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' },
			}),
			inject: [ConfigService],
		}),
	],
	exports: [UserService],
})
export class UserModule {}
