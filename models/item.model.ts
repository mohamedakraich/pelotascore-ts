import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ItemModel {
  @PrimaryColumn()
  id: number;
  @Column({ length: 256 })
  name: string;
  @Column('text')
  description: string;
}
