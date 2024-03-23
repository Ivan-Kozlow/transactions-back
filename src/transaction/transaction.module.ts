import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { TransactionService } from './transaction.service'
import { CategoryService } from 'src/category/category.service'

import { CategoryEntity } from 'src/category/entities/category.entity'
import { TransactionEntity } from './entities/transaction.entity'
import { TransactionController } from './transaction.controller'

@Module({
	controllers: [TransactionController],
	providers: [TransactionService, CategoryService],
	imports: [TypeOrmModule.forFeature([TransactionEntity, CategoryEntity])],
})
export class TransactionModule {}
