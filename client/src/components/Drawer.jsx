import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Drawer() {
  const [filter, setFilter] = React.useState([]);
  const [state, setState] = React.useState({
    left: false,
    right: false
  });

  var temp = [];
  const handleFilter = (event) => {
    console.log(event.target.name)
    if (event.target.checked) {
      setFilter([...filter,event.target.name])
    }
    else {
      var temp = filter.filter(function (value, index, arr) {
        return value !== (event.target.name);
      });
      setFilter(temp)
    }

    console.log(filter)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, mt: 8 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Computer', 'Civil', 'IT', 'Chemical', 'Mechanical', 'Automobile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <FormGroup>
                <FormControlLabel control={<Checkbox name={text.slice(0, 4).toUpperCase()} onChange={handleFilter} />} label={text} />
              </FormGroup>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        sx={{ m: 4 }}
      >
        Submit
      </Button>    </Box>
  );

  return (
    <div className='LeftDrawer'>
      <div className="DrawerBtn">
        <Button onClick={toggleDrawer('left', true)} variant="outlined" sx={{ position: 'absolute', top: 68 }}>Filters</Button>
      </div>
      <React.Fragment key={'left'}>
        <SwipeableDrawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
