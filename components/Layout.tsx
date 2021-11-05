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
            { code: 'GB', name: 'Premiere League' },
            { code: 'FR', name: 'Ligue 1' },
            { code: 'DE', name: 'Bundesliga' },
            { code: 'IT', name: 'Serie A' },
            { code: 'ES', name: 'LaLiga' },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <ReactCountryFlag
                  countryCode={item.code}
                  svg
                  style={{
                    width: '3em',
                    height: '1.5em',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>All Leagues</ListSubheader>
          {[
            { code: 'AR', name: 'Liga Profesional' },
            { code: 'AT', name: 'Bundesliga' },
            { code: 'AT', name: '2. Liga' },
            { code: 'BE', name: 'Jupiler League' },
            { code: 'BY', name: 'Premier League' },
            { code: 'BR', name: 'Serie A' },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <ReactCountryFlag
                  countryCode={item.code}
                  svg
                  style={{
                    width: '3em',
                    height: '1.5em',
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
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
