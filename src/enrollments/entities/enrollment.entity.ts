import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('Enrollment') // Nome exato da tabela de matrículas
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments)
  @JoinColumn({ name: 'userId' }) // Nome da coluna no SQLite
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'courseId' }) // Nome da coluna no SQLite
  course: Course;
}