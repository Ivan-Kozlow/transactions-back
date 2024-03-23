import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CategoryService } from './category.service'
import { TransactionService } from 'src/transaction/transaction.service'

import { TransactionEntity } from 'src/transaction/entities/transaction.entity'
import { CategoryController } from './category.controller'
import { CategoryEntity } from './entities/category.entity'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, TransactionService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, TransactionEntity])],
})
export class CategoryModule {}
