import { Match } from '../../types/Match';
import generate_form_stats, {
  generate_match_form_stats,
} from '../generate_form_stats';

const _22FormStats = {
  GP: 1,
  W: 0,
  D: 1,
  L: 0,
  GF: 2,
  GA: 2,
  GD: 0,
  Pts: 1,
  STR: ',D',
};

const _30FormStats = {
  GP: 1,
  W: 1,
  D: 0,
  L: 0,
  GF: 3,
  GA: 0,
  GD: 3,
  Pts: 3,
  STR: ',W',
};

const _overallFormStats = {
  GP: 5,
  W: 4,
  D: 1,
  L: 0,
  GF: 15,
  GA: 2,
  GD: 13,
  Pts: 13,
  STR: ',D,W,W,W,W',
};

const _homeFormStats = {
  GP: 3,
  W: 2,
  D: 1,
  L: 0,
  GF: 11,
  GA: 2,
  GD: 9,
  Pts: 7,
  STR: ',D,W,W',
};

const _awayFormStats = {
  GP: 2,
  W: 2,
  D: 0,
  L: 0,
  GF: 4,
  GA: 0,
  GD: 4,
  Pts: 6,
  STR: ',W,W',
};

const overallFormMatches: Match[] = [
  {
    home_name: 'Chelsea',
    away_name: 'Southampton',
    home_FullTimeGoals: 3,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 1,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 2,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Brentford',
    away_name: 'Chelsea',
    home_FullTimeGoals: 0,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 0,
    away_FirstHalfGoals: 1,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Chelsea',
    away_name: 'Norwich City',
    home_FullTimeGoals: 7,
    away_FullTimeGoals: 0,
    home_FirstHalfGoals: 3,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 4,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Newcastle Utd',
    away_name: 'Chelsea',
    home_FullTimeGoals: 0,
    away_FullTimeGoals: 3,
    home_FirstHalfGoals: 0,
    away_FirstHalfGoals: 3,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 3,
  },
  {
    home_name: 'Chelsea',
    away_name: 'Burnley',
    home_FullTimeGoals: 1,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 1,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 1,
  },
];

const homeFormMatches: Match[] = [
  {
    home_name: 'Chelsea',
    away_name: 'Southampton',
    home_FullTimeGoals: 3,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 1,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 2,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Chelsea',
    away_name: 'Norwich City',
    home_FullTimeGoals: 7,
    away_FullTimeGoals: 0,
    home_FirstHalfGoals: 3,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 4,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Chelsea',
    away_name: 'Burnley',
    home_FullTimeGoals: 1,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 1,
    away_FirstHalfGoals: 0,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 1,
  },
];

const awayFormMatches: Match[] = [
  {
    home_name: 'Brentford',
    away_name: 'Chelsea',
    home_FullTimeGoals: 0,
    away_FullTimeGoals: 1,
    home_FirstHalfGoals: 0,
    away_FirstHalfGoals: 1,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 0,
  },
  {
    home_name: 'Newcastle Utd',
    away_name: 'Chelsea',
    home_FullTimeGoals: 0,
    away_FullTimeGoals: 3,
    home_FirstHalfGoals: 0,
    away_FirstHalfGoals: 3,
    home_SecondHalfGoals: 0,
    away_SecondHalfGoals: 3,
  },
];

test('It generates form stats for 2-2 correctly', () => {
  expect(generate_match_form_stats(2, 2)).toEqual(_22FormStats);
});

test('It generates form stats for 3-0 correctly', () => {
  expect(generate_match_form_stats(3, 0)).toEqual(_30FormStats);
});

test('It generates OVERALL form stats correctly', () => {
  expect(generate_form_stats('OVERALL', 'Chelsea', overallFormMatches)).toEqual(
    _overallFormStats
  );
});

test('It generates HOME form stats correctly', () => {
  expect(generate_form_stats('HOME', 'Chelsea', homeFormMatches)).toEqual(
    _homeFormStats
  );
});

test('It generates AWAY form stats correctly', () => {
  expect(generate_form_stats('AWAY', 'Chelsea', awayFormMatches)).toEqual(
    _awayFormStats
  );
});
