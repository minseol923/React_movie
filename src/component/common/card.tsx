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
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchStore } from "../../stores";
import { useDrag, useDrop } from "react-dnd";

interface Props {
  search?: boolean;
  favorite?: boolean;
}
interface favoriteMovie {
  Title: String;
  Year: String;
  imdbID: String;
  Type: String;
  Poster: String;
}

const ResultCard = ({ search, favorite }: Props) => {
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
      const isCurrentlyFavorite = favoriteMovies.some(
        (favMovie: favoriteMovie) => favMovie.imdbID === selectedMovie.imdbID
      );

      if (isCurrentlyFavorite) {
        const updatedFavorites = favoriteMovies.filter(
          (favMovie: favoriteMovie) => favMovie.imdbID !== selectedMovie.imdbID
        );
        //즐겨찾기 제거
        setFavoriteMovies(updatedFavorites);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
      } else {
        //즐겨찾기 추가
        setFavoriteMovies([...favoriteMovies, selectedMovie]);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify([...favoriteMovies, selectedMovie])
        );
      }
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 검색 탭 결과 카드 */}
        {search && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              marginLeft: "70px",
              marginTop: "20px",
              marginBottom: "60px",
            }}
          >
            {searchMovieResult &&
              Object?.values(searchMovieResult)?.map(
                (movie: any, index: number) => {
                  // 즐겨찾기를 저장한 데이터 확인
                  const isFavorite = favoriteMovies.some(
                    (favMovie: favoriteMovie) =>
                      favMovie.imdbID === movie.imdbID
                  );
                  return (
                    <Card
                      sx={{ maxWidth: "70%" }}
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
                          {isFavorite && (
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                              color={"red"}
                            >
                              *즐겨찾는 영화*
                            </Typography>
                          )}

                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            영화 제목 : {movie.Title}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            개봉 년도 : {movie.Year}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            시리즈 : {movie.Type}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                }
              )}
          </div>
        )}
        {favorite && (
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
            {Object.values(favoriteMovies).map((movie: any, index: number) => {
              // 즐겨찾기를 저장한 데이터 확인
              return (
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
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        영화 제목 : {movie.Title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        개봉 년도 : {movie.Year}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        시리즈 : {movie.Type}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        )}

        <Dialog onClose={handleClose} open={visible}>
          <DialogTitle>영화 즐겨찾기</DialogTitle>
          <DialogContent>
            {favoriteMovies && selectedMovie && (
              <div>
                {favoriteMovies.some(
                  (favMovie) => favMovie.imdbID === selectedMovie.imdbID
                ) ? (
                  <>
                    <div>선택한 영화를 즐겨찾기에서 제거하시겠습니까?</div>
                    <div>
                      즐겨찾기를 해제하면 "즐겨찾기 탭"에서 리스트를 확인할 수
                      없습니다.
                    </div>
                  </>
                ) : (
                  <>
                    <div>선택한 영화를 즐겨찾기에 등록하시겠습니까?</div>
                    <div>
                      즐겨찾기를 선택하면 "즐겨찾기 탭"에서 리스트를 확인할 수
                      있습니다.
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>

          <DialogActions>
            {favoriteMovies && selectedMovie && (
              <Button onClick={onSubmit} autoFocus>
                {favoriteMovies.some(
                  (favMovie: favoriteMovie) =>
                    favMovie.imdbID === selectedMovie.imdbID
                )
                  ? "즐겨찾기 해제"
                  : "즐겨찾기"}
              </Button>
            )}
            <Button onClick={handleClose} autoFocus>
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
export default ResultCard;
