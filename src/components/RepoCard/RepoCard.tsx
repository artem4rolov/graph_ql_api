import React from "react";
import { RepoType } from "../../types/RepoType";

import styles from "./RepoCard.module.scss";

interface RepoCardProps {
  card: RepoType;
}

const RepoCard = ({ card }: RepoCardProps) => {
  const { name, stargazerCount, updatedAt, url } = card;

  return (
    <div className={styles.repoCard}>
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
