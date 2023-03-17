import React, { useEffect, useRef } from "react";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllMyRepos } from "../../redux/slices/Repos/reposAsyncActions";
import { RepoType } from "../../types/RepoType";
import RepoCard from "../../components/RepoCard/RepoCard";

import styles from "./Home.module.scss";

const Home = () => {
  const { list, pagination } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllMyRepos());
  }, []);

  console.log(list);
  console.log(pagination);

  // поиск репозиториев
  const handleSearch = () => {};

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
        <span>what</span>
      </div>
    </div>
  );
};

export default Home;
