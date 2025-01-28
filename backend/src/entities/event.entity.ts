import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Organiser } from './organiser.entity';
import { EventCategory } from './eventCategory.entity';

@Entity("event")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  venue: string;

  @Column({ type: "text" })
  image: string;

  @Column()
  organiser_id: string;

  @Column({ type: "enum", enum: ["OnGround", "Virtual", "OnGround+Virtual"] })
  event_type: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  pincode: string;

  @Column()
  banner_image: string;

    // Foreign Key constraint
    @ManyToOne(() => Organiser, { onDelete: "CASCADE" })
    @JoinColumn({ name: "organiser_id" })
    organiser: Organiser;
  
    @OneToMany(() => EventCategory, (eventCategory) => eventCategory.event)
    eventCategories: EventCategory[];  
}
