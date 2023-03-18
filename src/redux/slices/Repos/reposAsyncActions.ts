import { createAsyncThunk } from "@reduxjs/toolkit";

// импортируем access token classic из gitHub для доступа к gitHub api
const configValue: string =
  import.meta.env.VITE_SOME_STRING || process.env.VITE_SOME_STRING;

// получение моих репозиториев
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
                owner {
                  login
                }
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

// получение конкретного репозитория по клику
export const fetchCurrentRepo = createAsyncThunk(
  "fetchCurrentRepo",
  async (data: { repoName: string | null; owner: string | null }) => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${configValue}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          repository(name: "${data.repoName}", owner: "${data.owner}") {
            id
            name
            stargazerCount
            owner {
              avatarUrl
              login
              url
            }
            languages(first: 20) {
              edges {
                node {
                  name
                }
              }
            }
            description
            updatedAt
          }
        }`,
      }),
    }).then((res) => {
      return res.json();
    });
    return response;
  }
);

// поиск репозиотриев по ключевому слову из Input
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
                  owner {
                    login
                  }
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
