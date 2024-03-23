import { UserModule } from './user/user.module'
import { TransactionModule } from './transaction/transaction.module'
import { CategoryModule } from './category/category.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { AppService } from './app.service'

import { getTypeOrmConfig } from './configs/getTypeOrmConfig'
import { AppController } from './app.controller'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig,
		}),
		UserModule,
		TransactionModule,
		AuthModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
