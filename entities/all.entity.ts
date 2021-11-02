import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'leagues' })
export class LeagueEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => MatchEntity, (match) => match.league)
  matches: MatchEntity[];

  @OneToMany(() => StatisticsEntity, (stats) => stats.league)
  stats: StatisticsEntity[];
}

@Entity({ name: 'matches' })
export class MatchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: -1 })
  status: number;

  @Column()
  leagueId: string;

  @ManyToOne(() => LeagueEntity, (league) => league.matches)
  @JoinColumn({ name: 'leagueId' })
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
