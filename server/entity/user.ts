import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    profileId: number;

    @Column({ nullable: true })
    steamId?: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    clan?: string;

    @Column({ nullable: true })
    country?: string;

    @Column('jsonb')
    data: any;
}