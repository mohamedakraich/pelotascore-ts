import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LeagueEntity } from './league.entity';

@Entity({ name: 'statistics' })
export class StatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  leagueId: string;

  @ManyToOne(() => LeagueEntity, (league) => league.stats)
  @JoinColumn({ name: 'leagueId' })
  league: LeagueEntity;

  @Column()
  team_name: string;

  @Column()
  GP: number;

  @Column()
  W: number;

  @Column()
  D: number;

  @Column()
  L: number;

  @Column()
  GF: number;

  @Column()
  GA: number;

  @Column()
  GD: number;

  @Column()
  P: number;

  @Column()
  LP15: number;

  @Column()
  VP15: number;
}
