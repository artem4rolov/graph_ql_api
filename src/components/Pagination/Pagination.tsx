import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAllMyRepos,
  searchRepoByName,
} from "../../redux/slices/Repos/reposAsyncActions";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  searchValue: string | null;
}

const Pagination = ({ searchValue }: PaginationProps) => {
  const { pagination, refreshData } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  console.log(searchValue);

  React.useEffect(() => {}, [refreshData]);

  const handleNextPage = () => {
    if (pagination?.hasNextPage && !searchValue) {
      dispatch(
        fetchAllMyRepos({ next: `"${pagination?.endCursor}"`, prev: null })
      );
      return;
    }
    dispatch(
      searchRepoByName({
        repoName: searchValue,
        next: `"${pagination?.endCursor}"`,
        prev: null,
      })
    );
    return;
  };

  const handlePrevPage = () => {
    if (pagination?.hasPreviousPage && !searchValue) {
      dispatch(
        fetchAllMyRepos({ next: null, prev: `"${pagination?.endCursor}"` })
      );
      return;
    }

    dispatch(
      searchRepoByName({
        repoName: searchValue,
        next: null,
        prev: `"${pagination?.endCursor}"`,
      })
    );
  };

  return (
    <div className={styles.Pagination}>
      <button
        onClick={handlePrevPage}
        disabled={!pagination?.hasPreviousPage || !pagination?.startCursor}
      >
        {!searchValue ? "В начало" : "Рандом"}
      </button>
      <button
        onClick={handleNextPage}
        disabled={!pagination?.hasNextPage || !pagination?.endCursor}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
