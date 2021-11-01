import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'england' })
export class FixtureModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  home_name: string;

  @Column()
  home_FullTimeGoals: number;

  @Column()
  home_FirstHalfGoals: number;

  @Column()
  home_SecondHalfGoals: number;

  @Column()
  away_name: string;

  @Column()
  away_FullTimeGoals: number;

  @Column()
  away_FirstHalfGoals: number;

  @Column()
  away_SecondHalfGoals: number;
}
