import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Photo } from "./Photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

	@Column()
  email: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];
  
}