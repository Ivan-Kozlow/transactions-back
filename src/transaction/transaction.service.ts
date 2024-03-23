import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { TransactionEntity } from './entities/transaction.entity'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { CreateTransactionDto } from './dto/create-transaction.dto'

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>,
	) {}
	async create(createTransactionDto: CreateTransactionDto, id: number) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			category: { id: +createTransactionDto.category },
			user: { id },
		}
		if (!newTransaction) throw new BadRequestException('Something went wrong')
		return await this.transactionRepository.save(newTransaction)
	}

	async findAllByType(id: number, type: string) {
		const transactions = await this.transactionRepository.find({
			where: { user: { id }, type },
			order: { createdAt: 'DESC' },
		})
		return transactions.reduce((acc, item) => acc + item.amount, 0)
	}

	async findOne(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
			relations: { category: true, user: true },
		})

		if (!transaction) throw new NotFoundException('Transaction not found')
		return transaction
	}

	async findAll(id: number) {
		return await this.transactionRepository.find({
			where: { user: { id } },
			relations: { category: true },
			order: { createdAt: 'DESC' },
		})
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		const transaction = await this.transactionRepository.findOne({ where: { id } })
		if (!transaction) throw new NotFoundException('Transaction not found')

		return await this.transactionRepository.update(id, updateTransactionDto)
	}

	async remove(id: number) {
		const transaction = await this.transactionRepository.findOne({ where: { id } })
		if (!transaction) throw new NotFoundException('Transaction not found')
		return await this.transactionRepository.delete(id)
	}

	async findAllWithPagination(id: number, page: number, limit: number) {
		return await this.transactionRepository.find({
			where: { user: { id } },
			order: { createdAt: 'DESC' },
			skip: (page - 1) * limit,
			take: limit,
			relations: {
				category: true,
				user: true,
			},
		})
	}
}
