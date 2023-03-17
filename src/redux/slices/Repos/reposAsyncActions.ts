import { createAsyncThunk } from "@reduxjs/toolkit";
import { RepoType } from "../../../types/RepoType";

const githubData: any = {
  token: "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",
  username: "artem4rolov",
};

export const fetchAllMyRepos = createAsyncThunk("fetchAllMyRepos", async () => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${githubData["token"]}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        viewer {
          login
          repositories(after: null, before: null, first: 10) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            edges {
              node {
                id
                name
                stargazerCount
                url
                updatedAt
              }
            }
          }
        }
      }`,
    }),
  }).then((response) => response.json());
  // затипизировать репозиторий (для списка репозиториев)
  return response;
});

export const fetchCurrentRepo = createAsyncThunk(
  "fetchCurrentRepo",
  async (params) => {}
);
