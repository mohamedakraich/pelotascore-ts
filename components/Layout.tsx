import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ReactCountryFlag from 'react-country-flag';
import { ListSubheader } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';

const drawerWidth = 240;

const Layout: React.FC = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/*<AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListSubheader>Favorite Leagues</ListSubheader>
          {[
            {
              code: 'gb-eng',
              name: 'Premiere League',
              link: '/leagues?id=england_1',
            },
            { code: 'fr', name: 'Ligue 1', link: '/leagues?id=france_1' },
            { code: 'de', name: 'Bundesliga', link: '/leagues?id=germany_1' },
            { code: 'it', name: 'Serie A', link: '/leagues?id=italy_1' },
            { code: 'es', name: 'LaLiga', link: '/leagues?id=spain_1' },
            {
              code: 'pt',
              name: 'Primeira Liga',
              link: '/leagues?id=portugal_1',
            },
            {
              code: 'nl',
              name: 'Eredivisie',
              link: '/leagues?id=netherlands_1',
            },
          ].map((item, index) => (
            <Link key={index} href={item.link} passHref>
              <ListItem button>
                <ListItemIcon>
                  <span
                    className={'flag-icon flag-icon-' + item.code}
                    style={{ width: '3em', height: '1.5em' }}
                  ></span>
                  {/*<ReactCountryFlag
                    countryCode={item.code}
                    svg
                    style={{
                      width: '3em',
                      height: '1.5em',
                    }}
                  />*/}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>All Leagues</ListSubheader>
          {[
            {
              code: 'ar',
              name: 'Liga Profesional',
              link: '/leagues?id=argentina_1',
            },
            { code: 'at', name: 'Bundesliga', link: '/leagues?id=austria_1' },
            { code: 'at', name: '2. Liga', link: '/leagues?id=austria_2' },
            {
              code: 'be',
              name: 'Jupiler League',
              link: '/leagues?id=belgium_1',
            },
            {
              code: 'by',
              name: 'Premier League',
              link: '/leagues?id=belarus_1',
            },
            { code: 'br', name: 'Serie A', link: '/leagues?id=brazil_1' },
            { code: 'br', name: 'Serie B', link: '/leagues?id=brazil_2' },
            { code: 'dk', name: 'Superligaen', link: '/leagues?id=denmark_1' },
            {
              code: 'gb-eng',
              name: 'Premiere League',
              link: '/leagues?id=england_1',
            },
            {
              code: 'gb-eng',
              name: 'Championship',
              link: '/leagues?id=england_2',
            },
            { code: 'fr', name: 'Ligue 1', link: '/leagues?id=france_1' },
            { code: 'fr', name: 'Ligue 2', link: '/leagues?id=france_2' },
            { code: 'fr', name: 'National', link: '/leagues?id=france_3' },
            {
              code: 'eg',
              name: 'Premier League',
              link: '/leagues?id=egypt_1',
            },
            { code: 'de', name: 'Bundesliga', link: '/leagues?id=germany_1' },
            {
              code: 'de',
              name: '2. Bundesliga',
              link: '/leagues?id=germany_2',
            },
            { code: 'it', name: 'Serie A', link: '/leagues?id=italy_1' },
            { code: 'it', name: 'Serie B', link: '/leagues?id=italy_2' },
            {
              code: 'ie',
              name: 'Premier Division',
              link: '/leagues?id=ireland_1',
            },
            { code: 'ma', name: 'Botola Pro', link: '/leagues?id=morocco_1' },
            {
              code: 'nl',
              name: 'Eredivisie',
              link: '/leagues?id=netherlands_1',
            },
            {
              code: 'nl',
              name: 'Eerste Divisie',
              link: '/leagues?id=netherlands_2',
            },
          ].map((item, index) => (
            <Link key={index} href={item.link} passHref>
              <ListItem button key={index}>
                <ListItemIcon>
                  <span
                    className={'flag-icon flag-icon-' + item.code}
                    style={{ width: '3em', height: '1.5em' }}
                  ></span>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/*<Toolbar />*/}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
