import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { UserLesson } from '../../user-lessons/entities/user-lesson.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'STUDENT' })
  role: string;

 

  @Column({ type: 'integer', nullable: true })
  createdAt: number;

  @Column({ type: 'integer', nullable: true })
  updatedAt: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => UserLesson, (userLesson) => userLesson.user)
  userLessons: UserLesson[];
}