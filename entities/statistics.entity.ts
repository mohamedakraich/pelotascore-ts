import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statistics' })
export class StatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  P: number;

  @Column()
  LP15: number;

  @Column()
  VP15: number;
}
