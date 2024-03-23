import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CategoryEntity } from 'src/category/entities/category.entity'

export class CreateTransactionDto {
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
	amount: number

	@IsString()
	type: 'expense' | 'income'

	@IsNotEmpty()
	category: CategoryEntity
}
