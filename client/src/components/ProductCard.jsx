import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PImage from "../media/sample-book.jpg";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';

export default function ProductCard() {
  return (
    <div className="productCard">
      <Card sx={{ maxWidth: 'auto', borderRadius: 2 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={PImage}
          title="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sem 4 - DSA Greedy notes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <Button size="small">₹00</Button>
            <Button size="small">Learn More</Button>
          </div>
          <div className="CardIcons">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
