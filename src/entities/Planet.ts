import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity} from 'typeorm';
import {Users} from "./Users"
@Entity()
export class Planet extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  picture_url: string;

  @ManyToMany(() => Users, user => user.planets)
  users: Users[];

}