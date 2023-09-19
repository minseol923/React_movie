import React, { useEffect } from "react";
import ResultCard from "../../component/common/card";

const SearchMovieCard = ({ responseType }) => {
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
        "검색결과가 없습니다."
      )}
    </div>
  );
};
export default SearchMovieCard;
