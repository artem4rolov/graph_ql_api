import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useAppSelector } from "../../redux/hooks";

import styles from "./RepoPage.module.scss";

const RepoPage = () => {
  const { currentRepo, list, status } = useAppSelector((state) => state.repos);
  const navigate = useNavigate();

  // если списка репозиториев и конкретного репозитория нет - возвращаемся на главную
  useEffect(() => {
    if (!list && !currentRepo) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {status !== "loading" && currentRepo ? (
        <div className={styles.repoPage}>
          <div className={styles.ownerInfo}>
            <img
              className={styles.ownerAvatar}
              src={currentRepo?.owner.avatarUrl}
              alt="user avatar"
            />
            <span className={styles.ownerLogin}>
              {currentRepo?.owner.login}
            </span>
            <a
              className={styles.ownerLink}
              href={currentRepo?.owner.url}
              target="_blank"
            >
              Github
            </a>
          </div>
          <div className={styles.repoInfo}>
            <span>Название репозитория:</span>
            <span className={styles.repoName}>{currentRepo?.name}</span>
            <span>Краткое описание:</span>
            <span className={styles.repoDesc}>{currentRepo?.description}</span>
            <span>Количество звёзд:</span>
            <span className={styles.repoStars}>
              {currentRepo?.stargazerCount}
            </span>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <NavLink to={"/"} replace>
        <button className={styles.repoPageButton}>На главную</button>
      </NavLink>
    </>
  );
};

export default RepoPage;
