import React from "react";
import { RepoType } from "../../types/RepoType";

import styles from "./RepoCard.module.scss";

interface RepoCardProps {
  card: RepoType;
  openRepo: (
    id: string | null,
    repoName: string | null,
    owner: string | null
  ) => void;
}

const RepoCard = ({ card, openRepo }: RepoCardProps) => {
  const { id, name, stargazerCount, updatedAt, url, owner } = card;

  return (
    <div
      className={styles.repoCard}
      // по клику на карточку репозитория передаем id карточки (для перехода по роуту), название репозитория и логин вадельца репозитория (для получения подробных данных о р)
      onClick={() => openRepo(id, name, owner.login)}
    >
      <span>Имя репозитория: {name}</span>
      <p>звезды: {stargazerCount}</p>
      <div>
        <p>{updatedAt.toString()}</p>
        <a href={url} target="_blank">
          Репозиторий
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
