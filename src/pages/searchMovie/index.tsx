import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useRecoilState } from "recoil";
import SearchMovieCard from "./searchMovieCard";
import { searchStore } from "../../stores";
import NoData from "./noData";

const SearchMovie = () => {
  const [searchMovieResult, setSearchMovieResult] = useRecoilState(
    searchStore.searchMovieList
  );

  const [pagination, setPagination] = useRecoilState(searchStore.pagination);

  const [responseReulstType, setResponseReulstType] = useState<Boolean>(false);

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
    console.log("response", response);

    if (response.data) {
      const responseType = response.data.Response;
      setResponseReulstType(responseType);
      const resultSearch = response.data.Search;
      setSearchMovieResult(resultSearch);
    }
    const korean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    if (korean.test(searchText)) {
      alert("영어로 검색어를 입력해주세요.");
      return;
    }
  };

  return (
    <div style={{ justifyContent: "center", position: "relative" }}>
      <Box sx={{ mt: 3, justifyContent: "center" }}>
        <TextField
          sx={{
            width: "70%",
            marginLeft: "20px",
            size: "large",
            position: "sticky",
            top: "0",
            zIndex: "1",
            backgroundColor: "white",
          }}
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
          sx={{
            marginLeft: "10px",
            position: "sticky",
            top: "0",
            zIndex: "1",
          }}
          onClick={handleSearchBtnClick}
        >
          검색
        </Button>
        <SearchMovieCard responseType={responseReulstType} />
      </Box>
    </div>
  );
};

export default SearchMovie;
