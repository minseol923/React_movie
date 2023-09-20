import { useState } from "react";
import { useRouter } from "next/router";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import React from "react";
import FavoriteMovie from "../../pages/favoriteMovie";
import SearchMovie from "../../pages/searchMovie";

const MainList = (props: any) => {
  const router = useRouter();

  const [value, setValue] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          position: "fixed",
          bottom: 0,
          width: 1.0,
          backgroundColor: "gray",
          zIndex: 1,
        }}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="검색"
          icon={<AttachEmailOutlinedIcon />}
        />
        <BottomNavigationAction
          label="즐겨찾기"
          icon={<CloudDownloadOutlinedIcon />}
        />
      </BottomNavigation>
      {value === 0 && <SearchMovie />}
      {value === 1 && <FavoriteMovie />}
    </div>
  );
};

export default MainList;
