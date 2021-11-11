import { StandingsType } from './StandingsType';

export interface StandingsDTOType {
  normal: {
    overall: StandingsType[];
    home: StandingsType[];
    away: StandingsType[];
  };
  form: {
    overall: StandingsType[];
    home: StandingsType[];
    away: StandingsType[];
  };
}
