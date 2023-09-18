import { searchStore } from "@/stores";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const SearchMovieCard = () => {
  const [searchMovieResult, setSearchMovieResult] = useRecoilState(
    searchStore.searchMovieList
  );

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [visible, setVisible] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const clickMovie = (movie: any) => {
    setSelectedMovie(movie);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = () => {
    if (selectedMovie) {
      setFavoriteMovies([...favoriteMovies, selectedMovie]);
      console.log("영화를 즐겨찾기에 추가했습니다.");
    }
    setVisible(false);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "null"
    );
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <div style={{ justifyContent: "center" }}>
      <Box sx={{ mt: 3, justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            marginLeft: "50px",
            marginTop: "20px",
            marginBottom: "60px",
          }}
        >
          {Object.values(searchMovieResult).map((movie: any, index: number) => (
            <Card
              sx={{ maxWidth: "80%" }}
              key={index}
              onClick={() => clickMovie(movie)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="400px"
                  image={movie.Poster}
                />
                <CardContent>
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
          ))}
        </div>
        <Dialog onClose={handleClose} open={visible}>
          <DialogTitle>영화 즐겨찾기</DialogTitle>
          <DialogContent>
            <div>선택한 영화를 즐겨찾기에 등록하시겠습니까?</div>
            <div>
              즐겨찾기를 선택시 "즐겨찾기 탭"에서 리스트를 확인할 수 있습니다.
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={onSubmit} autoFocus>
              즐겨찾기
            </Button>
            <Button onClick={handleClose} autoFocus>
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
export default SearchMovieCard;
