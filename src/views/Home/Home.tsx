import React, { useEffect, useRef } from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAllMyRepos,
  fetchCurrentRepo,
  searchRepoByName,
} from "../../redux/slices/Repos/reposAsyncActions";
import RepoCard from "../../components/RepoCard/RepoCard";

import styles from "./Home.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const { list, status } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // при первом рендере компонента
  useEffect(() => {
    if (!list) {
      dispatch(fetchAllMyRepos({ next: null, prev: null }));
    }
  }, []);

  // поиск репозиториев
  const handleSearch = (value: string | null) => {
    setSearchValue(value);
    dispatch(
      searchRepoByName({
        repoName: value,
        next: null,
        prev: null,
      })
    );
  };

  // открываем карточку репозитория
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
        {list && status !== "loading" ? (
          list.map((repo) => {
            return (
              <RepoCard
                key={repo.node.id}
                card={repo.node}
                openRepo={handleOpenCurrentRepo}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      {/* секция пагинации */}
      <Pagination searchValue={searchValue} />
    </div>
  );
};

export default Home;
