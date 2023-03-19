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
  list: { node: RepoType }[] | null;
  pagination: PaginationType | null;
  currentRepo: CurrentRepoType | null;
};

// пустой массив репозиториев
const initialState: ReposSlice = {
  currentRepo: null,
  pagination: null,
  list: null,
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
      })
      .addCase(fetchAllMyRepos.fulfilled, (state, action) => {
        state.status = "finished";
        state.currentRepo = null;
        state.list = action.payload?.data.viewer.repositories.edges;
        state.pagination = action.payload?.data.viewer.repositories.pageInfo;
      })
      .addCase(fetchAllMyRepos.rejected, (state) => {
        state.status = "error";
        state.list = null;
      })

      // получение репозиториев по результатам поиска
      .addCase(searchRepoByName.pending, (state) => {
        state.status = "loading";
        state.list = null;
      })
      .addCase(searchRepoByName.fulfilled, (state, action) => {
        state.status = "finished";
        state.currentRepo = null;
        state.list = action.payload?.data.search.edges;
        state.pagination = action.payload?.data.search.pageInfo;
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
