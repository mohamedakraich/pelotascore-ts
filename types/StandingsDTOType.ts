import { GoalsStandingsType } from './GoalsStandingsType';
import { HTFTStandingsType } from './HTFTStandingsType';
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
  goals: {
    overall: GoalsStandingsType[];
    home: GoalsStandingsType[];
    away: GoalsStandingsType[];
  };
  HTFT: {
    overall: HTFTStandingsType[];
    home: HTFTStandingsType[];
    away: HTFTStandingsType[];
  };
}
