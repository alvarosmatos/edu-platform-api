import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('Course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer' })
  authorId: number;

  @Column({ type: 'integer' })
  createdAt: number;

  @Column({ type: 'integer' })
  updatedAt: number;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}