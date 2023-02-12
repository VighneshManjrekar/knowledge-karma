import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TableFooter,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  }
}));

const names = [{
  name: 'John',
  email: "dhas@gmail.com",
  points: 35
},
{
  name: 'Jane',
  email: "dhas@gmail.com",
  points: 29
},
{
  name: 'Bob',
  email: "dhas@gmail.com",
  points: 41
},
{
  name: 'Linda',
  email: "dhas@gmail.com",
  points: 33
},

{
  name: 'Jane',
  email: "dhas@gmail.com",
  points: 29
},
{
  name: 'Bob',
  email: "dhas@gmail.com",
  points: 415
},
{
  name: 'Linda',
  email: "dhas@gmail.com",
  points: 333
},
{
  name: 'Jane',
  email: "dhas@gmail.com",
  points: 249
},
{
  name: 'Bob',
  email: "dhas@gmail.com",
  points: 434
},
{
  name: 'Linda',
  email: "dhas@gmail.com",
  points: 323
},

]

function MTable() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [people, setPeople] = useState(names);

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/auth/ranking")
      .then((response) => {
        setPeople(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);



  // const sortDescending = () => {
  //   setPeople([...people].sort((a, b) => b.points - a.points));
  // };

  const classes = useStyles();
  const mystyle = {
    display: "flex",
    justifyContent: "center",
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  return (
    <div style={mystyle}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}><h3>User Info</h3></TableCell>
              <TableCell className={classes.tableHeaderCell}><h3>Points</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Grid container>
                    <Grid item lg={2}>
                      <Avatar alt={person.name} src='.' className={classes.avatar} />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography className={classes.name}><h5>{person.name}</h5></Typography>
                      <Typography color="textSecondary" variant="body2"><h7>{person.email}</h7></Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2"><h5>  {person.points}</h5></Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* <button onClick={sortDescending}>Sort by points (Descending)</button> */}
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MTable;
