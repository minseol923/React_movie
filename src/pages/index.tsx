import Head from "next/head";
import Header from "@/component/layout/Header";
import MainList from "@/component/main/MainList";
import { useState } from "react";

const Home = () => {
  const [totalPages, setTotalPages] = useState(0);
  return (
    <div>
      <Head>
        <title>영화 검색</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <MainList />
      </div>
    </div>
  );
};

export default Home;
