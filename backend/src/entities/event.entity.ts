import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToMany, 
    JoinColumn 
  } from "typeorm";
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
  
    @Column({ type: "text", array: true })  // Changed from single image to array
    gallery_images: string[];  
  
    @Column()
    organiser_id: number;
  
    @Column({ type: "enum", enum: ["OnGround", "Virtual", "OnGround+Virtual"] })
    event_type: string;
  
    @Column({ type: "enum", enum: ["Running", "Walking", "Cycling"] })
    activity_type: string;
  
    @Column()
    start_date: Date;
  
    @Column()
    end_date: Date;
  
    @Column({ nullable: true }) 
    reg_close_date: Date;  // Registration closing date
  
    @Column()
    country: string;
  
    @Column()
    state: string;
  
    @Column()
    city: string;
  
    @Column()
    pincode: string;
  
    @Column({ type: "text" }) 
    area: string;  // New column for area
  
    @Column()
    banner_image: string;
  
    @Column({ type: "text" })
    mobile_banner: string;  // New column for mobile banner
  
    // Foreign Key constraint
    @ManyToOne(() => Organiser, { onDelete: "CASCADE" })
    @JoinColumn({ name: "organiser_id" })
    organiser: Organiser;
  
    @OneToMany(() => EventCategory, (eventCategory) => eventCategory.event)
    eventCategories: EventCategory[];
  }
  