import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity('product_catalog')
export class Product extends BaseEntity {
    @PrimaryColumn({ type: 'varchar' })
    product_id!: string;

    @Column({ type: 'varchar' })
    product_name!: string;

    @Column({ type: 'varchar' })
    description!: string;

    @Column({ type: 'float' })
    price!: number;
}
