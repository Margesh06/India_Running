import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Event } from './event.entity';
import { Category } from './category.entity';

@Entity("event_categories")
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;
}
