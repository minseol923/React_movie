import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';

const MovieCard = ({ movie, index, clickMovie, isFavorite}: any) => {
  return (
    <Card sx={{ maxWidth: "80%" }} key={index} onClick={() => clickMovie(movie)}>
      <CardActionArea>
        <CardMedia component="img" height="400px" image={movie.Poster} />
        <CardContent>
        {isFavorite && (
            <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                color={"red"}
            >
                <GradeIcon /> 즐겨찾는 영화 <GradeIcon />
            </Typography>
            )}
          <Typography gutterBottom variant="subtitle1" component="div">
            영화 제목 : {movie.Title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            개봉 년도 : {movie.Year}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            시리즈 : {movie.Type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;