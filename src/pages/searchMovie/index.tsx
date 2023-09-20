import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useRecoilState } from "recoil";
import SearchMovieCard from "./searchMovieCard";
import { searchStore } from "../../stores";

const SearchMovie = () => {
  const [searchMovieResult, setSearchMovieResult] = useRecoilState(
    searchStore.searchMovieList
  );
  const [pagination, setPagination] = useRecoilState(searchStore.pagination);
  const [responseResultType, setResponseResultType] = useState<Boolean>(false);
  const [searchText, setSearchText] = useRecoilState(searchStore.searchKeywords);

  const [totalResults, setTotalResults] = useState<number>(0); 
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = window.document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreData();
    }
  };

  const loadMoreData = async () => {
    if (pagination.count) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
  
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=92e32667&s=${searchText}&page=${pagination.page + 1}`
        );
  
        if (response.data) {
          const responseType = response.data.Response;
          setResponseResultType(responseType);
          const newSearchResult = response.data.Search;
          setSearchMovieResult((prevResults: any) => [...prevResults, ...newSearchResult] as any);
  
          setTotalResults(parseInt(response.data.totalResults));
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pagination.page]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const handleSearchBtnClick = async () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: 1,
    }));

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=92e32667&s=${searchText}&page=${pagination.page}`
      );

      if (response.data) {
        const responseType = response.data.Response;
        setResponseResultType(responseType);
        const resultSearch = response.data.Search;
        setSearchMovieResult(resultSearch);
        setTotalResults(parseInt(response.data.totalResults));
      }

      const korean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
      if (korean.test(searchText)) {
        alert("영어로 검색어를 입력해주세요.");
        return;
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
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
        <SearchMovieCard
          responseType={responseResultType}
          totalResults={totalResults}
        />
      </Box>
    </div>
  );
};

export default SearchMovie;




