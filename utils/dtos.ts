import { LeagueEntity, MatchEntity } from "../entities/all.entity";
import { FixtureStatsDTO } from "../types/FixtureStatsDTO";
import { LeagueStatsDTO } from "../types/LeagueStatsDTO";
import { MatchDTO } from "../types/MatchDTO";
import { MatchStatsDTO } from "../types/MatchStatsDTO";
import { PredictionsDTO } from "../types/PreditionsDTO";

const calculateP = (value: number): number => {
  const floorVal = Math.floor(value);
  const ceilVal = Math.ceil(value);
  return Math.abs(value - ceilVal) < Math.abs(value - floorVal)
    ? ceilVal
    : floorVal;
};

export const matchEntityToMatchDTO = (matchEntity: MatchEntity): MatchDTO => {
  const {
    id,
    status,
    date,
    home_team: { name: home_name },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_team: { name: away_name },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  } = matchEntity;

  const matchDTO = {
    id,
    status,
    date:
      date.toDateString() +
      "#" +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2),
    home_name,
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_name,
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  };

  return matchDTO;
};

export const matchEntityToMatchStatsDTO = (
  matchEntity: MatchEntity
): MatchStatsDTO => {
  const {
    id,
    status,
    date,
    league: { name: league_name },
    home_team: { name: home_name, stats: home_stats },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_team: { name: away_name, stats: away_stats },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  } = matchEntity;

  const matchStatsDTO = {
    id,
    status,
    date: date.toISOString(),
    league_name,
    home_name,
    home_stats: {
      GP: home_stats.overall_GP,
      W: home_stats.overall_W,
      S2G: home_stats.overall_S2G,
      C2G: home_stats.overall_C2G,
      S3G: home_stats.overall_S3G,
      C3G: home_stats.overall_C3G,
      P25: home_stats.overall_P25,
      P35: home_stats.overall_P35,
      P45: home_stats.overall_P45,
    },
    home_FullTimeGoals,
    home_FirstHalfGoals,
    home_SecondHalfGoals,
    away_name,
    away_stats: {
      GP: away_stats.overall_GP,
      W: away_stats.overall_W,
      S2G: away_stats.overall_S2G,
      C2G: away_stats.overall_C2G,
      S3G: away_stats.overall_S3G,
      C3G: away_stats.overall_C3G,
      P25: away_stats.overall_P25,
      P35: away_stats.overall_P35,
      P45: away_stats.overall_P45,
    },
    away_FullTimeGoals,
    away_FirstHalfGoals,
    away_SecondHalfGoals,
  };

  return matchStatsDTO;
};

export const matchEntityToFixtureStatsDTO = (
  matchEntity: MatchEntity
): FixtureStatsDTO => {
  const {
    id,
    status,
    date,
    league: { name: league_name },
    home_team: { name: home_name, stats: home_stats },
    away_team: { name: away_name, stats: away_stats },
  } = matchEntity;

  const fixtureStatsDTO: FixtureStatsDTO = {
    id: matchEntity.id,
    status,
    date: date.toISOString(),
    league_name,
    home_name,
    away_name,
    FT: {
      home: {
        GP: home_stats.home_GP,
        W: home_stats.home_W,
        FTS: home_stats.home_FTS,
        CS: home_stats.home_CS,
        BTS: home_stats.home_BTS,
        S2G: home_stats.home_S2G,
        C2G: home_stats.home_C2G,
        S3G: home_stats.home_S3G,
        C3G: home_stats.home_C3G,
        P25: home_stats.home_P25,
        P35: home_stats.home_P35,
      },
      away: {
        GP: away_stats.away_GP,
        W: away_stats.away_W,
        FTS: away_stats.away_FTS,
        CS: away_stats.away_CS,
        BTS: away_stats.away_BTS,
        S2G: away_stats.away_S2G,
        C2G: away_stats.away_C2G,
        S3G: away_stats.away_S3G,
        C3G: away_stats.away_C3G,
        P25: away_stats.away_P25,
        P35: away_stats.away_P35,
      },
    },
    _1HT: {
      home: {
        GP: home_stats.home_GP,
        W: home_stats.home_1HT_W,
        FTS: home_stats.home_1HT_FTS,
        CS: home_stats.home_1HT_CS,
        BTS: home_stats.home_1HT_BTS,
        S1G: home_stats.home_1HT_S1G,
        C1G: home_stats.home_1HT_C1G,
        S2G: home_stats.home_1HT_S2G,
        C2G: home_stats.home_1HT_C2G,
        P15: home_stats.home_1HT_P15,
        P25: home_stats.home_1HT_P25,
      },
      away: {
        GP: away_stats.away_GP,
        W: away_stats.away_1HT_W,
        FTS: away_stats.away_1HT_FTS,
        CS: away_stats.away_1HT_CS,
        BTS: away_stats.away_1HT_BTS,
        S1G: away_stats.away_1HT_S1G,
        C1G: away_stats.away_1HT_C1G,
        S2G: away_stats.away_1HT_S2G,
        C2G: away_stats.away_1HT_C2G,
        P15: away_stats.away_1HT_P15,
        P25: away_stats.away_1HT_P25,
      },
    },
    _2HT: {
      home: {
        GP: home_stats.home_GP,
        W: home_stats.home_2HT_W,
        FTS: home_stats.home_2HT_FTS,
        CS: home_stats.home_2HT_CS,
        BTS: home_stats.home_2HT_BTS,
        S1G: home_stats.home_2HT_S1G,
        C1G: home_stats.home_2HT_C1G,
        S2G: home_stats.home_2HT_S2G,
        C2G: home_stats.home_2HT_C2G,
        P15: home_stats.home_2HT_P15,
        P25: home_stats.home_2HT_P25,
      },
      away: {
        GP: away_stats.away_GP,
        W: away_stats.away_2HT_W,
        FTS: away_stats.away_2HT_FTS,
        CS: away_stats.away_2HT_CS,
        BTS: away_stats.away_2HT_BTS,
        S1G: away_stats.away_2HT_S1G,
        C1G: away_stats.away_2HT_C1G,
        S2G: away_stats.away_2HT_S2G,
        C2G: away_stats.away_2HT_C2G,
        P15: away_stats.away_2HT_P15,
        P25: away_stats.away_2HT_P25,
      },
    },
  };

  return fixtureStatsDTO;
};

export const leagueEntityToLeagueStatsDTO = (
  leagueEntity: LeagueEntity
): LeagueStatsDTO => {
  const {
    id,
    name,
    country,
    country_code,
    GP,
    FT_home_w,
    FT_draws,
    FT_away_w,
    FT_P15,
    FT_P25,
    FT_P35,
    FT_BTS,
    FT_CS,
    FT_FTS,
    _1HT_home_w,
    _1HT_draws,
    _1HT_away_w,
    _1HT_P15,
    _1HT_P25,
    _1HT_BTS,
    _1HT_CS,
    _1HT_FTS,
    _2HT_home_w,
    _2HT_draws,
    _2HT_away_w,
    _2HT_P15,
    _2HT_P25,
    _2HT_BTS,
    _2HT_CS,
    _2HT_FTS,
  } = leagueEntity;
  return {
    FT: {
      id,
      name,
      country,
      country_code,
      GP: GP,
      home_w: FT_home_w,
      draws: FT_draws,
      away_w: FT_away_w,
      P15: FT_P15,
      P25: FT_P25,
      P35: FT_P35,
      BTS: FT_BTS,
      CS: FT_CS,
      FTS: FT_FTS,
    },
    _1HT: {
      id,
      name,
      country,
      country_code,
      GP: GP,
      home_w: _1HT_home_w,
      draws: _1HT_draws,
      away_w: _1HT_away_w,
      P15: _1HT_P15,
      P25: _1HT_P25,
      BTS: _1HT_BTS,
      CS: _1HT_CS,
      FTS: _1HT_FTS,
    },
    _2HT: {
      id,
      name,
      country,
      country_code,
      GP: GP,
      home_w: _2HT_home_w,
      draws: _2HT_draws,
      away_w: _2HT_away_w,
      P15: _2HT_P15,
      P25: _2HT_P25,
      BTS: _2HT_BTS,
      CS: _2HT_CS,
      FTS: _2HT_FTS,
    },
  };
};

export const matchEntityToPredictionsDTO = (
  matchEntity: MatchEntity
): PredictionsDTO => {
  const {
    id,
    status,
    date,
    league: { name: league_name, country, country_code },
    home_team: { name: home_name, stats: home_stats },
    away_team: { name: away_name, stats: away_stats },
  } = matchEntity;

  const hGP = home_stats.home_GP;
  const aGP = away_stats.away_GP;

  const ACE = calculateP(
    (home_stats.home_W / hGP) * (away_stats.away_L / aGP) * 100
  );
  const DOS = calculateP(
    (home_stats.home_L / hGP) * (away_stats.away_W / aGP) * 100
  );

  const ACEP = calculateP(
    (home_stats.home_S2G / hGP) * (away_stats.away_C2G / aGP) * 100
  );
  const DOSP = calculateP(
    (home_stats.home_C2G / hGP) * (away_stats.away_S2G / aGP) * 100
  );
  const ACEP25 = calculateP(
    (home_stats.home_S3G / hGP) * (away_stats.away_C3G / aGP) * 100
  );
  const DOSP25 = calculateP(
    (home_stats.home_C3G / hGP) * (away_stats.away_S3G / aGP) * 100
  );

  /*const ACEPGOD = calculateP(
    ((home_stats.home_W / hGP) * (away_stats.away_L / aGP) +
      (home_stats.home_S2G / hGP) * (away_stats.away_C2G / aGP) +
      (home_stats.home_S3G / hGP) * (away_stats.away_C3G / aGP)) *
      (100 / 3)
  );

  const DOSPGOD = calculateP(
    ((home_stats.home_L / hGP) * (away_stats.away_W / aGP) +
      (home_stats.home_C2G / hGP) * (away_stats.away_S2G / aGP) +
      (home_stats.home_C3G / hGP) * (away_stats.away_S3G / aGP)) *
      (100 / 3)
  );*/
  const ACEPGOD = calculateP(
    (home_stats.home_W / hGP) *
      (away_stats.away_L / aGP) *
      (home_stats.home_S2G / hGP) *
      (away_stats.away_C2G / aGP) *
      (home_stats.home_S3G / hGP) *
      (away_stats.away_C3G / aGP) *
      100
  );

  const DOSPGOD = calculateP(
    (home_stats.home_L / hGP) *
      (away_stats.away_W / aGP) *
      (home_stats.home_C2G / hGP) *
      (away_stats.away_S2G / aGP) *
      (home_stats.home_C3G / hGP) *
      (away_stats.away_S3G / aGP) *
      100
  );

  const BTS = calculateP(
    (home_stats.home_S1G / hGP) *
      (home_stats.home_C1G / hGP) *
      (away_stats.away_S1G / aGP) *
      (away_stats.away_C1G / aGP) *
      100
  );

  const score11Odd =
    (home_stats.home_S1G / hGP) *
    (home_stats.home_C1G / hGP) *
    (away_stats.away_S1G / aGP) *
    (away_stats.away_C1G / aGP);
  const score20Odd = (home_stats.home_S2G / hGP) * (away_stats.away_C2G / aGP);
  const score02Odd = (home_stats.home_C2G / hGP) * (away_stats.away_S2G / aGP);

  const P15 = calculateP((score11Odd + score20Odd + score02Odd) * (100 / 3));

  const _1HT_score11Odd =
    (home_stats.home_1HT_S1G / hGP) *
    (home_stats.home_1HT_C1G / hGP) *
    (away_stats.away_1HT_S1G / aGP) *
    (away_stats.away_1HT_C1G / aGP);
  const _1HT_score20Odd =
    (home_stats.home_1HT_S2G / hGP) * (away_stats.away_1HT_C2G / aGP);
  const _1HT_score02Odd =
    (home_stats.home_1HT_C2G / hGP) * (away_stats.away_1HT_S2G / aGP);

  const _1HT_P15 = calculateP(
    (_1HT_score11Odd + _1HT_score20Odd + _1HT_score02Odd) * (100 / 3)
  );

  const _1HT_P15_2 = calculateP(
    (home_stats.home_1HT_P15 / hGP + away_stats.away_1HT_P15 / aGP) * 50
  );

  const score30Odd = (home_stats.home_S3G / hGP) * (away_stats.away_C3G / aGP);
  const score03Odd = (home_stats.home_C3G / hGP) * (away_stats.away_S3G / aGP);
  const score21Odd =
    (home_stats.home_S2G / hGP) *
    (home_stats.home_C1G / hGP) *
    (away_stats.away_C2G / aGP) *
    (away_stats.away_S1G / aGP);
  const score12Odd =
    (home_stats.home_S1G / hGP) *
    (home_stats.home_C2G / hGP) *
    (away_stats.away_C1G / aGP) *
    (away_stats.away_S2G / aGP);

  const P25 = calculateP(
    (score30Odd + score03Odd + score21Odd + score12Odd) * 25
  );

  const P35_2 = calculateP(
    ((home_stats.home_P35 / hGP +
      away_stats.away_P35 / aGP +
      (home_stats.home_P35 / hGP) * (away_stats.away_P35 / aGP)) *
      100) /
      3
  );

  // Calculating P35
  const score40Odd = (home_stats.home_S4G / hGP) * (away_stats.away_C4G / aGP);
  const score04Odd = (home_stats.home_C4G / hGP) * (away_stats.away_S4G / aGP);
  const score31Odd =
    (home_stats.home_S3G / hGP) *
    (home_stats.home_C1G / hGP) *
    (away_stats.away_C3G / aGP) *
    (away_stats.away_S1G / aGP);
  const score13Odd =
    (home_stats.home_S1G / hGP) *
    (home_stats.home_C3G / hGP) *
    (away_stats.away_C1G / aGP) *
    (away_stats.away_S3G / aGP);
  const score22Odd =
    (home_stats.home_S2G / hGP) *
    (home_stats.home_C2G / hGP) *
    (away_stats.away_C2G / aGP) *
    (away_stats.away_S2G / aGP);

  const P35 = calculateP(
    (score40Odd + score04Odd + score31Odd + score13Odd + score22Odd) * 20
  );

  const ACE_2 = calculateP((ACE + ACEP + ACEP25) / 3);
  const DOS_2 = calculateP((DOS + DOSP + DOSP25) / 3);

  /*const BTS = calculateP(
    (home_stats.home_BTS / hGP + away_stats.away_BTS / aGP) * 50
  );

  const P25 = calculateP(
    (home_stats.home_P25 / hGP + away_stats.away_P25 / aGP) * 50
  );

  const P35 = calculateP(
    (home_stats.home_P35 / hGP + away_stats.away_P35 / aGP) * 50
  );*/

  const predictionsDTO: PredictionsDTO = {
    id: matchEntity.id,
    status,
    date: date.toISOString(),
    league_name,
    country,
    country_code,
    home_name,
    away_name,
    ACE,
    DOS,
    ACE_2,
    DOS_2,
    ACEP,
    DOSP,
    ACEP25,
    DOSP25,
    BTS,
    P15,
    P25,
    P35,
    P35_2,
    ACEPGOD,
    DOSPGOD,
  };

  return predictionsDTO;
};
