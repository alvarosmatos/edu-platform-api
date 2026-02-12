import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { UserLesson } from '../../user-lessons/entities/user-lesson.entity';

@Entity('Lesson')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ name: 'courseId' })
  courseId: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => UserLesson, (userLesson) => userLesson.lesson)
  userLessons: UserLesson[];
}