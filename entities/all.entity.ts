import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
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
  overall_GP: number;
  @Column()
  home_GP: number;
  @Column()
  away_GP: number;

  @Column()
  overall_W: number;
  @Column()
  home_W: number;
  @Column()
  away_W: number;

  @Column()
  overall_D: number;
  @Column()
  home_D: number;
  @Column()
  away_D: number;

  @Column()
  overall_L: number;
  @Column()
  home_L: number;
  @Column()
  away_L: number;

  @Column()
  overall_GF: number;
  @Column()
  home_GF: number;
  @Column()
  away_GF: number;

  @Column()
  overall_GA: number;
  @Column()
  home_GA: number;
  @Column()
  away_GA: number;

  @Column()
  overall_GD: number;
  @Column()
  home_GD: number;
  @Column()
  away_GD: number;

  @Column()
  overall_Pts: number;
  @Column()
  home_Pts: number;
  @Column()
  away_Pts: number;

  @Column()
  overall_S2G: number;
  @Column()
  home_S2G: number;
  @Column()
  away_S2G: number;

  @Column()
  overall_C2G: number;
  @Column()
  home_C2G: number;
  @Column()
  away_C2G: number;

  @Column()
  overall_S3G: number;
  @Column()
  home_S3G: number;
  @Column()
  away_S3G: number;

  @Column()
  overall_C3G: number;
  @Column()
  home_C3G: number;
  @Column()
  away_C3G: number;

  @Column()
  overall_P15: number;
  @Column()
  home_P15: number;
  @Column()
  away_P15: number;

  @Column()
  overall_P25: number;
  @Column()
  home_P25: number;
  @Column()
  away_P25: number;

  @Column()
  overall_P35: number;
  @Column()
  home_P35: number;
  @Column()
  away_P35: number;

  @Column()
  overall_P45: number;
  @Column()
  home_P45: number;
  @Column()
  away_P45: number;
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
