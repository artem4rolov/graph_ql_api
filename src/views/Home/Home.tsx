import React, { useEffect, useRef } from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAllMyRepos,
  searchRepoByName,
} from "../../redux/slices/Repos/reposAsyncActions";
import { RepoType } from "../../types/RepoType";
import RepoCard from "../../components/RepoCard/RepoCard";

import styles from "./Home.module.scss";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  const { list, refreshData } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllMyRepos({ next: null, prev: null }));
  }, []);

  useEffect(() => {}, [refreshData]);

  console.log(list);

  // поиск репозиториев
  const handleSearch = (value: string | null) => {
    if (value?.trim() !== null) {
      setSearchValue(value);
      dispatch(
        searchRepoByName({
          repoName: value,
          next: null,
          prev: null,
        })
      );
    }
    dispatch(fetchAllMyRepos({ next: null, prev: null }));
  };

  // const changePage = (value) => {};

  return (
    <div className={styles.Home}>
      <Input onSearch={handleSearch} />
      <div className={styles.HomeContent}>
        {list
          ? list.map((repo) => {
              return (
                <RepoCard key={repo.node.id + Math.random()} card={repo.node} />
              );
            })
          : "no cards"}
      </div>
      <Pagination searchValue={searchValue} />
    </div>
  );
};

export default Home;
