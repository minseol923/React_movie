import React from "react";
import ResultCard from "../../component/common/card";

const FavoriteMovie = () => {
  return (
    <div>
      <h2
        style={{
          backgroundColor: "red",
          width: "100%",
        }}
      >
        내 즐겨찾기
      </h2>
      <ResultCard favorite={true} />
    </div>
  );
};

export default FavoriteMovie;
