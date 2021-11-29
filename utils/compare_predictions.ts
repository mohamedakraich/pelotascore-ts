import { PredictionsDTO } from "../types/PreditionsDTO";

const compare_predictions = (a: PredictionsDTO, b: PredictionsDTO) => {
  if (b.ACEP25 > a.ACEP25) return 1;
  else if (b.ACEP25 < a.ACEP25) return -1;
  else return 0;
};

export default compare_predictions;
