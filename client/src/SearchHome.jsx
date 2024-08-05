import React from "react";
import SearchProfile from "./assets/components/SearchProfile";
import SearchFavSongs from "./assets/components/SearchFavSongs";
import Footer from "./assets/components/Footer";
import SearchLikedSongs from "./assets/components/SearchLikedSongs";

const SearchHome = () => {
  return (
    <div>
      <SearchProfile />
      <SearchFavSongs />
      <SearchLikedSongs />
      <Footer />
    </div>
  );
};

export default SearchHome;
