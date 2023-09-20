import React, { useEffect } from "react";
import ResultCard from "../../component/common/card";
import { Divider, Chip } from "@mui/material";
const SearchMovieCard = ( {responseType}  : any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      {responseType === "True" ? (
        <ResultCard search={true} />
      ) : (
        <div>
          검색결과가 없습니다.
        </div>
      )}
    </div>
  );
};
export default SearchMovieCard;
