import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum InclusiveItems {
  TimingChip = "Timing Chip",
  GoodieBag = "Goodie Bag",
  ECertificate = "E-Certificate",
  Refreshments = "Refreshments",
  Bib = "Bib",
  TimedBib = "Timed Bib",
  Medals = "Medals",
  Tshirt = "Tshirt",
}

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("decimal")
  price: number;

  @Column("text", { nullable: true })
  additionalInfo: string;

  @Column({ type: "int", nullable: true })
  ageLimitMin: number;

  @Column({ type: "int", nullable: true })
  ageLimitMax: number;

  @Column({
    type: 'enum',
    enum: InclusiveItems,
    array: true, // Enables storing multiple enum values as an array
    default: [],
  })
  inclusive: InclusiveItems[];
}
