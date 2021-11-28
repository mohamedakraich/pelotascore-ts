import { HTFTStandingsType } from "../types/HTFTStandingsType";
import { PredictionsDTO } from "../types/PreditionsDTO";
import { StandingsType } from "../types/StandingsType";

const compare_predictions = (a: PredictionsDTO, b: PredictionsDTO) => {
  if (b.DOSP25 > a.DOSP25) return 1;
  else if (b.DOSP25 < a.DOSP25) return -1;
  else return 0;
};

export default compare_predictions;
