import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity} from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

	@Column()
  email: string;

  @Column({ nullable: true })
  email_validated: boolean;

  // @OneToMany(() => Photo, photo => photo.user)
  // photos: Photo[];
  
}