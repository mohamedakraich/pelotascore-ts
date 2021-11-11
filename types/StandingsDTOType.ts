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
  HTFT: {
    overall: HTFTStandingsType[];
    home: HTFTStandingsType[];
    away: HTFTStandingsType[];
  };
}
