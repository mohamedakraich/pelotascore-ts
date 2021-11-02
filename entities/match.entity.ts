import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LeagueEntity } from './league.entity';

@Entity({ name: 'matches' })
export class MatchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: -1 })
  status: number;

  @ManyToOne(() => LeagueEntity, (league) => league.matches)
  league: LeagueEntity;

  @Column()
  date: Date;

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
