import { useRouter } from "next/router";
import MovieIcon from '@mui/icons-material/Movie';
import React from "react";

export interface Props {
  type?: string;
  title?: string;
}

const Header = ({ type, title }: Props) => {
  const router = useRouter();

  return (
    <header style={{ justifyContent: "center" }}>
     <MovieIcon style={{ marginRight: "6px" }} />
      <div style={{fontWeight : "bold", fontSize:"20px"}}>영화 검색 페이지</div>
    </header>
  );
};

export default Header;
