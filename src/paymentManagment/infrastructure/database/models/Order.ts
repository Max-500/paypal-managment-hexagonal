import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryColumn("varchar", { length: 255 })
  id!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ length: 3 })
  currencyCode!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}