import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { MatchEntity } from './match.entity';

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
}
