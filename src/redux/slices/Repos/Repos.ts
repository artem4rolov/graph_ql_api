import { createSlice } from "@reduxjs/toolkit";
import {
  CurrentRepoType,
  PaginationType,
  RepoType,
} from "../../../types/RepoType";
import {
  fetchAllMyRepos,
  fetchCurrentRepo,
  searchRepoByName,
} from "./reposAsyncActions";

// типизация переменных стейта
type ReposSlice = {
  status: "idle" | "loading" | "finished" | "error";
  list: { node: RepoType }[] | null | undefined;
  pagination: PaginationType | null | undefined;
  currentRepo: CurrentRepoType | null;
};

// если есть список репозиториев и пагинации в localStorage - забираем их
const list = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list") || "[]")
  : null;
const pagination = localStorage.getItem("pagination")
  ? JSON.parse(localStorage.getItem("pagination") || "[]")
  : null;

// пустой массив репозиториев
const initialState: ReposSlice = {
  currentRepo: null,
  pagination,
  list,
  status: "idle",
};

const reposSlise = createSlice({
  name: "@repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // получение моих репозиториев
      .addCase(fetchAllMyRepos.pending, (state) => {
        state.status = "loading";
        state.list = null;
        localStorage.setItem("list", JSON.stringify(state.list));
      })
      .addCase(fetchAllMyRepos.fulfilled, (state, action) => {
        state.status = "finished";
        state.currentRepo = null;
        state.list = action.payload?.data.viewer.repositories.edges;
        localStorage.setItem("list", JSON.stringify(state.list));
        state.pagination = action.payload?.data.viewer.repositories.pageInfo;
        localStorage.setItem("pagination", JSON.stringify(state.pagination));
      })
      .addCase(fetchAllMyRepos.rejected, (state) => {
        state.status = "error";
        state.list = null;
      })

      // получение репозиториев по результатам поиска
      .addCase(searchRepoByName.pending, (state) => {
        state.status = "loading";
        state.list = null;
        localStorage.setItem("list", JSON.stringify(state.list));
      })
      .addCase(searchRepoByName.fulfilled, (state, action) => {
        state.status = "finished";
        state.currentRepo = null;
        state.list = action.payload?.data.search.edges;
        localStorage.setItem("list", JSON.stringify(state.list));
        state.pagination = action.payload?.data.search.pageInfo;
        localStorage.setItem("pagination", JSON.stringify(state.pagination));
      })
      .addCase(searchRepoByName.rejected, (state) => {
        state.status = "error";
        state.list = null;
      })

      // открытие репозитория и его подробных данных по клику
      .addCase(fetchCurrentRepo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentRepo.fulfilled, (state, action) => {
        state.status = "finished";
        state.currentRepo = action.payload?.data.repository;
      })
      .addCase(fetchCurrentRepo.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default reposSlise.reducer;
