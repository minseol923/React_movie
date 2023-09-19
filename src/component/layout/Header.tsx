import { useRouter } from "next/router";
import React from "react";

export interface Props {
  type?: string;
  title?: string;
}

const Header = ({ type, title }: Props) => {
  const router = useRouter();

  return (
    <header style={{ justifyContent: "center" }}>
      <div>영화 검색 페이지</div>
    </header>
  );
};

export default Header;
