import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	@MinLength(6, { message: 'Minimum password length 6 characters' })
	password: string
}
