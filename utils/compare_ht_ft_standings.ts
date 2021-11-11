import { HTFTStandingsType } from '../types/HTFTStandingsType';
import { StandingsType } from '../types/StandingsType';

const compare_ht_ft_standings = (
  a: HTFTStandingsType,
  b: HTFTStandingsType
) => {
  if (b.Pts > a.Pts) return 1;
  else if (b.Pts < a.Pts) return -1;
  else {
    if (b.GD > a.GD) return 1;
    else if (b.GD < a.GD) return -1;
    else return 0;
  }
};

export default compare_ht_ft_standings;
