import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Search, Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { searchStore } from "@/stores";
import { useRecoilState } from "recoil";
import CustomTable from "@/component/custom/CustomTable";

const SearchMovie = () => {
  const [searchMovieResult, setSearchMovieResult] = useRecoilState(
    searchStore.searchMovieList
  );

  const [pagination, setPagination] = useRecoilState(searchStore.pagination);

  const textFieldInfo = {
    defaultValue: "",
  };
  const [searchText, setSearchText] = useState<string>(
    textFieldInfo?.defaultValue ?? ""
  );
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const handleSearchBtnClick = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=92e32667&s=${searchText}&page=${1}`
    );
    if (response.data.Response === "True") {
      const resultSearch = response.data.Search;
      console.log("xxxx : searchMovieResult", resultSearch);
      setSearchMovieResult(resultSearch);
    }
    console.log("클릭 버튼", searchMovieResult);
  };

  const clickMovie = () => {
    console.log("클릭 영화 ");
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = () => {
    setVisible(false);
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <Box sx={{ mt: 3, justifyContent: "center" }}>
        <TextField
          sx={{ width: "70%", marginLeft: "20px", size: "large" }}
          label={"영화를 검색해보세요!"}
          size="small"
          value={searchText}
          onChange={handleTextChange}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          size="medium"
          variant="contained"
          color="primary"
          sx={{ marginLeft: "10px" }}
          onClick={handleSearchBtnClick}
        >
          검색
        </Button>
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
            <Card sx={{ maxWidth: "80%" }} key={index} onClick={clickMovie}>
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

export default SearchMovie;
