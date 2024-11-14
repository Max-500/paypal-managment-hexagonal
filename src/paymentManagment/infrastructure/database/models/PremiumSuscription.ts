import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("premium_subscriptions")
export class PremiumSubscription {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // ID único de la suscripción

  @Column("uuid")
  userId!: string; // ID del usuario (relación lógica)

  @Column({ type: "varchar", length: 255 })
  orderId!: string; // ID de la orden creada en PayPal

  @Column({ type: "varchar", length: 255 })
  transactionId!: string; // ID de la transacción capturada (opcional)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  startDate!: Date; // Fecha de inicio de la suscripción

  @Column({ type: "timestamp" })
  endDate!: Date; // Fecha de fin de la suscripción

  @CreateDateColumn()
  createdAt!: Date; // Fecha de creación del registro

  @UpdateDateColumn()
  updatedAt!: Date; // Fecha de última actualización
}
