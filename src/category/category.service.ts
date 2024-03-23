import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { CategoryEntity } from './entities/category.entity'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

	async create(createCategoryDto: CreateCategoryDto, id: number) {
		const isExist = await this.categoryRepository.findBy({ user: { id }, title: createCategoryDto.title })
		if (isExist.length) throw new BadRequestException('Category already exists')

		const newCategory = {
			title: createCategoryDto.title,
			user: { id },
		}
		return await this.categoryRepository.save(newCategory)
	}

	async findAll(id: number) {
		return await this.categoryRepository.find({ where: { user: { id } }, relations: { transactions: true } })
	}

	async findOne(id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id },
			relations: { transactions: true, user: true },
		})
		if (!category) throw new NotFoundException('Category not found')
		return category
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const isExist = await this.categoryRepository.findOne({ where: { id } })
		if (!isExist) throw new NotFoundException('Category not found')
		return await this.categoryRepository.update(id, updateCategoryDto)
	}

	async remove(id: number) {
		const category = await this.categoryRepository.findOne({ where: { id } })
		if (!category) throw new NotFoundException('Category not found')
		return await this.categoryRepository.delete(id)
	}
}
