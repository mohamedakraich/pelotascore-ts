import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'england' })
export class MatchModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: -1 })
  status: number;

  @Column({ default: '' })
  date: string;

  @Column({ default: '' })
  time: string;

  @Column({ default: '' })
  home_name: string;

  @Column({ default: -1 })
  home_FullTimeGoals: number;

  @Column({ default: -1 })
  home_FirstHalfGoals: number;

  @Column({ default: -1 })
  home_SecondHalfGoals: number;

  @Column({ default: '' })
  away_name: string;

  @Column({ default: -1 })
  away_FullTimeGoals: number;

  @Column({ default: -1 })
  away_FirstHalfGoals: number;

  @Column({ default: -1 })
  away_SecondHalfGoals: number;
}
