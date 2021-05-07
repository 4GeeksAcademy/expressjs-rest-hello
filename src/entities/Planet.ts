import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity} from 'typeorm';
import {User} from "./User"
@Entity()
export class Planet extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  picture_url: string;

  @ManyToMany(() => User, user => user.planets)
  users: User[];

}