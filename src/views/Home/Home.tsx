import React, { useEffect, useRef } from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAllMyRepos,
  fetchCurrentRepo,
  searchRepoByName,
} from "../../redux/slices/Repos/reposAsyncActions";
import { RepoType } from "../../types/RepoType";
import RepoCard from "../../components/RepoCard/RepoCard";

import styles from "./Home.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import { Navigate, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  const { list } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // при первом рендере компонента
  useEffect(() => {
    dispatch(fetchAllMyRepos({ next: null, prev: null }));
  }, []);

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
    // если поле пустое, то по нажатию enter будут выводиться мои репозитории
    dispatch(fetchAllMyRepos({ next: null, prev: null }));
  };

  const handleOpenCurrentRepo = (
    id: string | null,
    repoName: string | null,
    owner: string | null
  ) => {
    // направялем на страницу выбранного репозитория
    dispatch(fetchCurrentRepo({ repoName, owner }));
    navigate(`/repo/${id}`);
  };

  return (
    <div className={styles.Home}>
      {/* секция поиска */}
      <Input onSearch={handleSearch} />
      {/* секция с карточками репозиториев */}
      <div className={styles.HomeContent}>
        {list
          ? list.map((repo) => {
              return (
                <RepoCard
                  key={repo.node.id}
                  card={repo.node}
                  openRepo={handleOpenCurrentRepo}
                />
              );
            })
          : "no cards"}
      </div>
      {/* секция пагинации */}
      <Pagination searchValue={searchValue} />
    </div>
  );
};

export default Home;
