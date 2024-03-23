import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Base } from 'src/utils/base.entity'

import { UserEntity } from 'src/user/entities/user.entity'
import { CategoryEntity } from 'src/category/entities/category.entity'

@Entity({ name: 'transaction' })
export class TransactionEntity extends Base {
	@Column()
	title: string

	@Column({ nullable: true })
	type: string

	@Column()
	amount: number

	@ManyToOne(() => CategoryEntity, (category) => category.transactions, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity

	@ManyToOne(() => UserEntity, (user) => user.transactions)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity
}
