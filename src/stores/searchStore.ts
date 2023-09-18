import { atom } from "recoil";

export type Pagination = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
};
export type SearchResult = {
  map(arg0: (option: any, index: any) => any): import("react").ReactNode;
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
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  } as Pagination,
});

export const searchMovieList = atom({
  key: "searchMovieList",
  default: {} as SearchResult,
});
