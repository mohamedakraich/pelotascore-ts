import { PreStatsType } from './PreStatsType';

export interface StatisticsMap {
  [key: string]: {
    overall: PreStatsType;
    home: PreStatsType;
    away: PreStatsType;
  };
}
