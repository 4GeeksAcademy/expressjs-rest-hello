import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

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

  @Column()
  is_active: boolean;

  // @OneToMany(() => Photo, photo => photo.user)
  // photos: Photo[];
  
}