

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('video_capsules')
export class VideoCapsule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    title: {
        en: string;
        fr: string;
    };

    @Column('json', { nullable: true })
    description: {
        en: string;
        fr: string;
    };

    @Column({ 
        type: "varchar", 
        length: 255, 
        nullable: false, 
        unique: true
    })
    fileName: string;

    @Column({ 
        type: "varchar", 
        length: 255, 
        nullable: true 
    })
    path: string;

    @CreateDateColumn()
    uploadedAt: Date;
}