import { Connection } from 'typeorm';
import { MatchEntity, TeamEntity } from '../entities/all.entity';

export const getMatchResult = async (
  connection: Connection,
  match: any,
  leagueStartingMonth: number
) => {
  let matchModel = new MatchEntity();

  const matchDate = match.children[0].children[0].children[0].data.trim();
  const home_name = match.children[1].children[0].data.trim();
  const away_name = match.children[3].children[0].data.trim();

  let home_team = await connection
    .getRepository<TeamEntity>('TeamEntity')
    .createQueryBuilder('team')
    .where('team.name = :name', { name: home_name })
    .getOne();

  let away_team = await connection
    .getRepository<TeamEntity>('TeamEntity')
    .createQueryBuilder('team')
    .where('team.name = :name', { name: away_name })
    .getOne();

  if (!home_team) {
    home_team = await connection
      .getRepository<TeamEntity>('TeamEntity')
      .save({ name: home_name });
  }

  if (!away_team) {
    away_team = await connection
      .getRepository<TeamEntity>('TeamEntity')
      .save({ name: away_name });
  }

  matchModel.date = getDateFromDateStr(matchDate, leagueStartingMonth);
  matchModel.status = 1;
  matchModel.home_team = home_team;
  matchModel.away_team = away_team;

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
    const timeHours = parseInt(matchTime.split(':')[0]);
    const timeMinutes = parseInt(matchTime.split(':')[1]);
    matchModel.date.setHours(timeHours);
    matchModel.date.setMinutes(timeMinutes);
  }

  return matchModel;
};

export const getMatchFixture = async (
  connection: Connection,
  match: any,
  leagueStartingMonth: number
) => {
  let matchModel = new MatchEntity();

  const fixtureDate = match.children[0].children[0].children[0].data.trim();

  const fixtureTime =
    match.children[2].children[0].data === 'pp.'
      ? match.children[2].children[0].data
      : match.children[2].children[0].children[0].data;

  const home_name = match.children[1].children[0].data.trim();
  const away_name = match.children[3].children[0].data.trim();

  let home_team = await connection
    .getRepository<TeamEntity>('TeamEntity')
    .createQueryBuilder('team')
    .where('team.name = :name', { name: home_name })
    .getOne();

  let away_team = await connection
    .getRepository<TeamEntity>('TeamEntity')
    .createQueryBuilder('team')
    .where('team.name = :name', { name: away_name })
    .getOne();

  if (!home_team) {
    const homeInsertResult = await connection
      .createQueryBuilder()
      .insert()
      .into(TeamEntity)
      .values([{ name: home_name }])
      .execute();

    home_team = homeInsertResult.generatedMaps[0] as TeamEntity;
  }

  if (!away_team) {
    const awayInsertResult = await connection
      .createQueryBuilder()
      .insert()
      .into(TeamEntity)
      .values([{ name: away_name }])
      .execute();

    away_team = awayInsertResult.generatedMaps[0] as TeamEntity;
  }

  matchModel.date = getDateFromDateStr(fixtureDate, leagueStartingMonth);

  if (fixtureTime !== 'pp.') {
    const timeHours = parseInt(fixtureTime.split(':')[0]);
    const timeMinutes = parseInt(fixtureTime.split(':')[1]);
    matchModel.date.setHours(timeHours);
    matchModel.date.setMinutes(timeMinutes);
    matchModel.status = 0;
  } else {
    matchModel.status = 99;
  }
  matchModel.home_team = home_team;
  matchModel.away_team = away_team;
  return matchModel;
};

export const getMatch = async (
  connection: Connection,
  match: any,
  leagueStartingMonth: number
) => {
  if (match.children.length === 9) {
    return await getMatchResult(connection, match, leagueStartingMonth);
  } else if (match.children.length === 7) {
    return await getMatchFixture(connection, match, leagueStartingMonth);
  } else return null;
};

export const getLeagueStartingMonth = (match: any) => {
  const matchDateStr = match.children[0].children[0].children[0].data.trim();
  return new Date(matchDateStr).getMonth();
};

export const getDateFromDateStr = (
  dateStr: string,
  leagueStartingMonth: number
) => {
  let tmpDate = new Date(dateStr);
  if (tmpDate.getMonth() >= leagueStartingMonth && tmpDate.getMonth() <= 11) {
    tmpDate.setFullYear(2021);
  } else {
    tmpDate.setFullYear(2022);
  }
  return tmpDate;
};
