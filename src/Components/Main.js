import React, { useState, useEffect } from "react";
import FetchUrl from "../FetchComponent/FetchUrl";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

import "./main.scss";
import SearchImage from "../FetchComponent/SearchImage";

const Main = () => {
  const [info, setInfo] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchedLoading, setSearchedLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data, loading } = await FetchUrl(
        "https://api.unsplash.com/photos/?client_id=mPPrNItdfN1rJQxQdc8KCBG9ljDFbUO7X21h3lCjDls"
      );
      setInfo(data);
      setLoading(loading);
    };
    getData();
  }, []);

  const handleClick = () => {
    setSearch("");
  };

  const searchImg = async () => {
    const data = await SearchImage(search);

    setSearchedData(data.data.results);
    setSearchedLoading(false);
  };
  console.log(search);

  console.log(searchedData);
  return (
    <div style={{ marginTop: "20px" }}>
      {loading && (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </h2>
      )}

      {loading || (
        <FormControl>
          <FormLabel
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Search Images
          </FormLabel>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <InputGroup>
              <Input
                id="text"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ margin: "2%", paddingLeft: "15px" }}
                placeholder="Enter to search"
              />
              {search === "" ? (
                <InputRightElement fontSize="15px" style={{ margin: "2%" }}>
                  <SearchIcon />
                </InputRightElement>
              ) : (
                <InputRightElement fontSize="15px" style={{ margin: "2%" }}>
                  <CloseIcon onClick={handleClick} />
                </InputRightElement>
              )}
            </InputGroup>
            <Button colorScheme="teal" size="md" onClick={searchImg}>
              Search
            </Button>
          </div>
        </FormControl>
      )}
      <div className="items">
        {search
          ? searchedData.map((i) => {
              return (
                <div key={i.user.id}>
                  <img src={i.urls.regular} alt="img" className="img" />
                </div>
              );
            })
          : info.map((img) => {
              return (
                <div key={img.user.id}>
                  <img src={img.urls.regular} alt="img" className="img" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Main;
