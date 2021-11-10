import { FormStatsType } from './FormStatsType';
import { HTStatsType } from './HTStatsType';

export interface StatsType {
  GP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  Pts: number;
  FTS: number;
  CS: number;
  BTS: number;
  S2G: number;
  C2G: number;
  S3G: number;
  C3G: number;
  WW: number;
  WD: number;
  WL: number;
  DW: number;
  DD: number;
  DL: number;
  LW: number;
  LD: number;
  LL: number;
  P15: number;
  P25: number;
  P35: number;
  P45: number;
  _1HT: HTStatsType;
  _2HT: HTStatsType;
  FORM: FormStatsType;
}
