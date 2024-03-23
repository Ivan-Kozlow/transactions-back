import { Base } from 'src/utils/base.entity'

import { UserEntity } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { TransactionEntity } from 'src/transaction/entities/transaction.entity'

@Entity({ name: 'category' })
export class CategoryEntity extends Base {
	@Column()
	title: string

	@ManyToOne(() => UserEntity, (user) => user.categories)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => TransactionEntity, (transaction) => transaction.category)
	transactions: TransactionEntity[]
}
