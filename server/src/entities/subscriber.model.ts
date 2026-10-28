

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('newsletter_subscribers')
export class Newsletter {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ unique: true })
    email!: string

    @Column({ default: true })
    active!: boolean

    @CreateDateColumn()
    createdAt!: Date
}