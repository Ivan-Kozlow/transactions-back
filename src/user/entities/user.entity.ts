import { Base } from 'src/utils/base.entity'

import { CategoryEntity } from 'src/category/entities/category.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { TransactionEntity } from 'src/transaction/entities/transaction.entity'

@Entity({ name: 'user' })
export class UserEntity extends Base {
	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => CategoryEntity, (category) => category.user, { onDelete: 'CASCADE' })
	categories: CategoryEntity[]

	@OneToMany(() => TransactionEntity, (transaction) => transaction.user, { onDelete: 'CASCADE' })
	transactions: TransactionEntity[]
}
