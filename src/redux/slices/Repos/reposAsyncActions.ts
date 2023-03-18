import { createAsyncThunk } from "@reduxjs/toolkit";

// import process from "process";

const configValue: string =
  import.meta.env.VITE_SOME_STRING || process.env.VITE_SOME_STRING;

export const fetchAllMyRepos = createAsyncThunk(
  "fetchAllMyRepos",
  async (pagination: { next: string | null; prev: string | null }) => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${configValue}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `{
        viewer {
          login
          repositories(first: 10, after: ${pagination?.next}, before: ${pagination?.prev}) {
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
    }).then((res) => {
      return res.json();
    });
    // затипизировать репозиторий (для списка репозиториев)
    return response;
  }
);

export const fetchCurrentRepo = createAsyncThunk(
  "fetchCurrentRepo",
  async (params) => {}
);

export const searchRepoByName = createAsyncThunk(
  "searchRepoByName",
  async (data: {
    repoName: string | null;
    next: string | null;
    prev: string | null;
  }) => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${configValue}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          search(
            query: "${data.repoName}"
            type: REPOSITORY
            first: 10
            after: ${data.next}
            before: ${data.prev}
          ) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  updatedAt
                  stargazerCount
                  url
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              startCursor
              hasPreviousPage
            }
          }
        }`,
      }),
    }).then((res) => {
      return res.json();
    });
    // затипизировать репозиторий (для списка репозиториев)
    return response;
  }
);
