import React from "react";
import ResultCard from "../../component/common/card";
import { Divider, Chip } from "@mui/material";

const FavoriteMovie = () => {
  return (
    <div>
       <Divider>
        <Chip label=" 내 즐겨찾기" />
      </Divider>
      <ResultCard favorite={true} />
    </div>
  );
};

export default FavoriteMovie;
