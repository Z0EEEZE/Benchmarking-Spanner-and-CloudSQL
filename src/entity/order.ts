import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryColumn({ type: 'varchar' })
    order_id!: string;

    @Column({ type: 'varchar' })
    product_id!: string;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'timestamptz' })
    order_date!: Date;
}
