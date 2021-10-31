import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '10-31-2021' })
export class FixtureModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  home_name: string;

  @Column()
  home_GP: number;

  @Column()
  home_W: number;

  @Column()
  home_FTS: number;

  @Column()
  home_CS: number;

  @Column()
  home_BTS: number;

  @Column({ type: 'double precision' })
  home_TG: number;

  @Column({ type: 'double precision' })
  home_GF: number;

  @Column({ type: 'double precision' })
  home_GA: number;

  @Column()
  home_P15: number;

  @Column()
  home_P25: number;

  @Column()
  home_P35: number;

  @Column({ type: 'double precision' })
  home_PPG: number;

  @Column()
  away_name: string;

  @Column()
  away_GP: number;

  @Column()
  away_W: number;

  @Column()
  away_FTS: number;

  @Column()
  away_CS: number;

  @Column()
  away_BTS: number;

  @Column({ type: 'double precision' })
  away_TG: number;

  @Column({ type: 'double precision' })
  away_GF: number;

  @Column({ type: 'double precision' })
  away_GA: number;

  @Column()
  away_P15: number;

  @Column()
  away_P25: number;

  @Column()
  away_P35: number;

  @Column({ type: 'double precision' })
  away_PPG: number;
}
