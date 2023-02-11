import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from  "./ProductCard";
import Container from '@mui/material/Container';



export default function ProductContainer() {
  return (
        <div className="ProductContainer">
          <Container fixed>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ProductCard />
                    </Grid>
                    ))}
                </Grid>
                </Box>
            </Container>
        </div>
  );
}
