import { FixtureEntity } from '../entities/fixture.entity';
import { Team } from '../models/team.model';

export const get_team_home = (team: any) => {
  const home = new Team();
  home.name = team.children[0].children[0].data;
  home.GP = parseInt(team.children[3].children[0].data);
  home.W = parseFloat(team.children[4].children[0].data);
  home.FTS = parseFloat(team.children[5].children[0].data);
  home.CS = parseFloat(team.children[6].children[0].data);
  home.BTS = parseFloat(team.children[7].children[0].data);
  home.TG = parseFloat(team.children[8].children[0].data);
  home.GF = parseFloat(team.children[9].children[0].data);
  home.GA = parseFloat(team.children[10].children[0].data);
  home.P15 = parseFloat(team.children[11].children[0].data);
  home.P25 = parseFloat(team.children[12].children[0].data);
  home.P35 = parseFloat(team.children[13].children[0].data);
  home.PPG = parseFloat(
    team.children[15].children[0].children[0].children[0].data
  );
  return home;
};

export const get_team_away = (team: any) => {
  //console.log(team.children[0].children[0].data);
  const away = new Team();
  away.name = team.children[0].children[0].data;
  away.GP = parseInt(team.children[2].children[0].data);
  away.W = parseFloat(team.children[3].children[0].data);
  away.FTS = parseFloat(team.children[4].children[0].data);
  away.CS = parseFloat(team.children[5].children[0].data);
  away.BTS = parseFloat(team.children[6].children[0].data);
  away.TG = parseFloat(team.children[7].children[0].data);
  away.GF = parseFloat(team.children[8].children[0].data);
  away.GA = parseFloat(team.children[9].children[0].data);
  away.P15 = parseFloat(team.children[10].children[0].data);
  away.P25 = parseFloat(team.children[11].children[0].data);
  away.P35 = parseFloat(team.children[12].children[0].data);
  away.PPG = parseFloat(
    team.children[14].children[0].children[0].children[0].data
  );
  return away;
};

export const getFixture = (
  fixtureTime: Date,
  homeTeam: Team,
  awayTeam: Team
) => {
  const fixture = new FixtureEntity();

  fixture.time = fixtureTime;

  fixture.home_name = homeTeam.name;
  fixture.home_GP = homeTeam.GP;
  fixture.home_W = homeTeam.W;
  fixture.home_FTS = homeTeam.FTS;
  fixture.home_CS = homeTeam.CS;
  fixture.home_BTS = homeTeam.BTS;
  fixture.home_TG = homeTeam.TG;
  fixture.home_GF = homeTeam.GF;
  fixture.home_GA = homeTeam.GA;
  fixture.home_P15 = homeTeam.P15;
  fixture.home_P25 = homeTeam.P25;
  fixture.home_P35 = homeTeam.P35;
  fixture.home_PPG = homeTeam.PPG;

  fixture.away_name = awayTeam.name;
  fixture.away_GP = awayTeam.GP;
  fixture.away_W = awayTeam.W;
  fixture.away_FTS = awayTeam.FTS;
  fixture.away_CS = awayTeam.CS;
  fixture.away_BTS = awayTeam.BTS;
  fixture.away_TG = awayTeam.TG;
  fixture.away_GF = awayTeam.GF;
  fixture.away_GA = awayTeam.GA;
  fixture.away_P15 = awayTeam.P15;
  fixture.away_P25 = awayTeam.P25;
  fixture.away_P35 = awayTeam.P35;
  fixture.away_PPG = awayTeam.PPG;

  return fixture;
};
