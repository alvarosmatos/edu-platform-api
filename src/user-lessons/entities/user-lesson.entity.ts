import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('UserLesson')
export class UserLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.userLessons)
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.userLessons)
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
}