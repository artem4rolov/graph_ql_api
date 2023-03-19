import { RepoType } from "../../types/RepoType";

import styles from "./RepoCard.module.scss";

import { TfiGithub } from "react-icons/tfi";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import { GoLogoGithub } from "react-icons/go";

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
      <div className={styles.iconCard}>
        <TfiGithub />
      </div>
      <div className={styles.repoName}>
        <span>{name}</span>
      </div>
      <div className={styles.iconStars}>
        <FaStarHalfAlt />
        <span>{stargazerCount}</span>
      </div>
      <div className={styles.iconDate}>
        <MdOutlineUpdate />
        <span>{new Date(updatedAt).toDateString()}</span>
      </div>
      <div className={styles.iconHrefOnRepo}>
        <GoLogoGithub />
        <a href={url} target="_blank">
          Ссылка на Репозиторий
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
