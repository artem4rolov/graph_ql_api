import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType, RepoType } from "../../../types/RepoType";
import { fetchAllMyRepos, searchRepoByName } from "./reposAsyncActions";

type ReposSlice = {
  refreshData: boolean;
  status: "idle" | "loading" | "finished" | "error";
  list: { node: RepoType }[] | null;
  pagination: PaginationType | null;
};

// пустой массив репозиториев
const initialState: ReposSlice = {
  refreshData: false,
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
        state.refreshData = false;
      })
      .addCase(fetchAllMyRepos.fulfilled, (state, action) => {
        state.status = "finished";
        state.refreshData = true;
        state.list = action.payload?.data.viewer.repositories.edges;
        state.pagination = action.payload?.data.viewer.repositories.pageInfo;
      })
      .addCase(fetchAllMyRepos.rejected, (state) => {
        state.status = "error";
        state.refreshData = false;
      })

      // получение репозиториев по результатам поиска
      .addCase(searchRepoByName.pending, (state) => {
        state.status = "loading";
        state.refreshData = false;
      })
      .addCase(searchRepoByName.fulfilled, (state, action) => {
        state.status = "finished";
        state.refreshData = true;
        state.list = action.payload?.data.search.edges;
        state.pagination = action.payload?.data.search.pageInfo;
      })
      .addCase(searchRepoByName.rejected, (state) => {
        state.status = "error";
        state.refreshData = false;
      });
  },
});

export default reposSlise.reducer;
