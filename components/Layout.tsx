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
import { all_leagues } from '../data/all_leagues';

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

        {all_leagues.map((country, cIndex) => (
          <React.Fragment key={cIndex}>
            <List>
              <ListSubheader>{country.countryName}</ListSubheader>
              {country.leagues.map((league, index) => (
                <Link key={index} href={'/leagues?id=' + league.id} passHref>
                  <ListItem button key={index}>
                    <ListItemIcon>
                      <span
                        className={'flag-icon flag-icon-' + country.countryCode}
                        style={{ width: '3em', height: '1.5em' }}
                      ></span>
                    </ListItemIcon>
                    <ListItemText primary={league.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </React.Fragment>
        ))}
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
