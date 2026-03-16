import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

// status: pending, approved, rejected

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user: User) => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ nullable: true })
  customerName: string;
  
  @Column({ nullable: true })
  customerEmail: string;
  
  @Column({ nullable: true })
  customerAddress: string;
  
  @Column({ nullable: true })
  customerCity: string;
  
  @Column({ nullable: true })
  customerPostalCode: string;
  
  @Column({ nullable: true })
  deliveryMethod: string;
}
