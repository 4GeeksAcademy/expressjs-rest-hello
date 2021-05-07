import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Planet} from "./Planet"
@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  password: string;

  @ManyToMany(() => Planet)
  @JoinTable()
  planets: Planet[];
  
}