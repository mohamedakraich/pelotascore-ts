import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  Index,
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
  S2G: number;

  @Column()
  C2G: number;

  @Column()
  S3G: number;

  @Column()
  C3G: number;

  @Column()
  FHS2G: number;

  @Column()
  FHC2G: number;

  @Column()
  FHP15: number;
}

@Entity({ name: 'teams' })
export class TeamEntity {
  @PrimaryColumn()
  name: string;

  @OneToOne(() => StatisticsEntity)
  @JoinColumn()
  stats: StatisticsEntity;

  @OneToMany(() => MatchEntity, (match) => match.home_team)
  home_matches: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.away_team)
  away_matches: MatchEntity[];
}

@Entity({ name: 'matches' })
export class MatchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: -1 })
  status: number;

  @Column()
  leagueId: string;

  @Column()
  date: Date;

  @ManyToOne(() => TeamEntity, (team) => team.home_matches)
  @JoinColumn({ name: 'home_team_name' })
  home_team: TeamEntity;

  @ManyToOne(() => TeamEntity, (team) => team.away_matches)
  @JoinColumn({ name: 'away_team_name' })
  away_team: TeamEntity;

  @Column({ default: -1 })
  home_FullTimeGoals: number;

  @Column({ default: -1 })
  home_FirstHalfGoals: number;

  @Column({ default: -1 })
  home_SecondHalfGoals: number;

  @Column({ default: -1 })
  away_FullTimeGoals: number;

  @Column({ default: -1 })
  away_FirstHalfGoals: number;

  @Column({ default: -1 })
  away_SecondHalfGoals: number;

  @ManyToOne(() => LeagueEntity, (league) => league.matches)
  @JoinColumn({ name: 'leagueId' })
  league: LeagueEntity;
}
