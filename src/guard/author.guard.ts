import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'

import { TransactionService } from 'src/transaction/transaction.service'
import { CategoryService } from 'src/category/category.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly categoryService: CategoryService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params

		let entity

		if (type === 'transaction') entity = await this.transactionService.findOne(+id)
		if (type === 'category') entity = await this.categoryService.findOne(+id)
		if (!entity) throw new NotFoundException('Something went wrong')

		const user = request.user
		if (entity && user && entity.user.id === user.id) return true
		else throw new BadRequestException('Something went wrong')
	}
}
