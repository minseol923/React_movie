import { atom } from "recoil";

export type Pagination = {
  count: number;
  page: number;
};
export type SearchResult = {
  Title: String;
  Year: String;
  imdbID: String;
  Type: String;
  Poster: String;
};

export const pagination = atom({
  key: "searchPagination",
  default: {
    count: 120,
    page: 1,
  } as Pagination,
});

export const searchMovieList = atom({
  key: "searchMovieList",
  default: {} as SearchResult,
});
