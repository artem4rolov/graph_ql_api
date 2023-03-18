import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RepoType } from "../../types/RepoType";

const RepoPage = () => {
  const { currentRepo } = useAppSelector((state) => state.repos);

  useEffect(() => {
    console.log(currentRepo);
  }, [currentRepo]);

  // id: string;
  // description: string;
  // languages: [string];
  // name: string;
  // owner: {
  //   login: string;
  // avatar
  // url
  // }
  // stargazerCount: number;

  return (
    <div className="repoPage">
      <span>{currentRepo?.description}</span>
      <span>{currentRepo?.name}</span>
      <span>{currentRepo?.stargazerCount}</span>
      <span>{currentRepo?.owner.login}</span>
      <img src={currentRepo?.owner.avatarUrl} alt="user avatar" />
      <a href={currentRepo?.owner.url} target="_blank">
        Github
      </a>
    </div>
  );
};

export default RepoPage;
