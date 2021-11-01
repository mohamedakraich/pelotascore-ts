import { MatchModel } from '../models/match.model';

export const logResult = (id: string, match: any) => {
  const matchDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const secondTeam = match.children[3].children[0].data.trim();
  if (match.children[2].children[0].children[0].data !== 'Aw. L') {
    const FT = match.children[2].children[0].children[0].children[0].data;
    const FHT = match.children[5].children[0].children[0].data.replace(
      /[{()}]/g,
      ''
    );
    //Fulltime result
    const HFTG = FT.split(' - ')[0];
    const AFTG = FT.split(' - ')[1];

    //First halftime result
    const HFHTG = FHT.split('-')[0];
    const AFHTG = FHT.split('-')[1];

    //Second halftime result
    const HSHTG = parseInt(HFTG) - parseInt(HFHTG);
    const ASHTG = parseInt(AFTG) - parseInt(AFHTG);

    console.log(
      id +
        ' | ' +
        '2' +
        ' | ' +
        matchDate +
        ' | ' +
        ' ' +
        ' | ' +
        firstTeam +
        ' | ' +
        secondTeam +
        ' | ' +
        HFTG +
        ' | ' +
        AFTG +
        ' | ' +
        HFHTG +
        ' | ' +
        AFHTG +
        ' | ' +
        HSHTG +
        ' | ' +
        ASHTG
    );
  } else if (match.children[2].children[0].children[0].data === 'Aw. L') {
    const matchTime = match.children[2].children[0].children[0].data;
    console.log(
      id +
        ' | ' +
        '2' +
        ' | ' +
        matchDate +
        ' | ' +
        matchTime +
        ' | ' +
        firstTeam +
        ' | ' +
        secondTeam +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0'
    );
  }
};

export const logFixture = (id: string, match: any) => {
  const fixtureDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const fixtureTime =
    match.children[2].children[0].data === 'pp.'
      ? match.children[2].children[0].data
      : match.children[2].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();

  console.log(
    id +
      ' | ' +
      '0' +
      ' | ' +
      fixtureDate +
      ' | ' +
      fixtureTime +
      ' | ' +
      firstTeam +
      ' | ' +
      secondTeam
  );
};

export const logMatch = (id: string, match: any) => {
  if (match.children.length === 9) {
    logResult(id, match);
  } else if (match.children.length === 7) {
    logFixture(id, match);
  }
};

export const getMatchResult = (match: any): MatchModel => {
  let matchModel = new MatchModel();

  const matchDate = match.children[0].children[0].children[0].data.trim();
  const home_name = match.children[1].children[0].data.trim();
  const away_name = match.children[3].children[0].data.trim();

  matchModel.date = matchDate;
  matchModel.status = 1;
  matchModel.home_name = home_name;
  matchModel.away_name = away_name;

  if (match.children[2].children[0].children[0].data !== 'Aw. L') {
    const fullTimeScoreStr =
      match.children[2].children[0].children[0].children[0].data;
    const firstHalfTimeScoreStr =
      match.children[5].children[0].children[0].data.replace(/[{()}]/g, '');
    const home_FullTimeGoals = parseInt(fullTimeScoreStr.split(' - ')[0]);
    const away_FullTimeGoals = parseInt(fullTimeScoreStr.split(' - ')[1]);

    const home_FirstHalfGoals = parseInt(firstHalfTimeScoreStr.split('-')[0]);
    const away_FirstHalfGoals = parseInt(firstHalfTimeScoreStr.split('-')[1]);

    const home_SecondHalfGoals = home_FullTimeGoals - home_FirstHalfGoals;
    const away_SecondHalfGoals = away_FullTimeGoals - away_FirstHalfGoals;

    matchModel.home_FullTimeGoals = home_FullTimeGoals;
    matchModel.home_FirstHalfGoals = home_FirstHalfGoals;
    matchModel.home_SecondHalfGoals = home_SecondHalfGoals;

    matchModel.away_FullTimeGoals = away_FullTimeGoals;
    matchModel.away_FirstHalfGoals = away_FirstHalfGoals;
    matchModel.away_SecondHalfGoals = away_SecondHalfGoals;
  } else if (match.children[2].children[0].children[0].data === 'Aw. L') {
    const matchTime = match.children[2].children[0].children[0].data;

    matchModel.time = matchTime;
  }
  return matchModel;
};

export const getMatchFixture = (match: any) => {
  let matchModel = new MatchModel();

  const fixtureDate = match.children[0].children[0].children[0].data.trim();
  const fixtureTime =
    match.children[2].children[0].data === 'pp.'
      ? match.children[2].children[0].data
      : match.children[2].children[0].children[0].data;
  const home_name = match.children[1].children[0].data.trim();
  const away_name = match.children[3].children[0].data.trim();

  matchModel.date = fixtureDate;
  matchModel.time = fixtureTime;
  matchModel.status = 0;
  matchModel.home_name = home_name;
  matchModel.away_name = away_name;
  return matchModel;
};

export const getMatch = (match: any): MatchModel | null => {
  if (match.children.length === 9) {
    return getMatchResult(match);
  } else if (match.children.length === 7) {
    return getMatchFixture(match);
  } else return null;
};
