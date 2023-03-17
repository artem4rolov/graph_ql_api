import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType, RepoType } from "../../../types/RepoType";
import { fetchAllMyRepos } from "./reposAsyncActions";

type ReposSlice = {
  status: "idle" | "loading" | "finished" | "error";
  list: { node: RepoType }[] | null;
  pagination: PaginationType[];
};

// пустой массив репозиториев
const initialState: ReposSlice = {
  pagination: [],
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
      })
      .addCase(fetchAllMyRepos.fulfilled, (state, action) => {
        state.status = "finished";
        state.list = action.payload?.data.viewer.repositories.edges;
        state.pagination = action.payload?.data.viewer.repositories.pageInfo;
      })
      .addCase(fetchAllMyRepos.rejected, (state) => {
        state.status = "error";
      });
    // получение репозиториев по результатам поиска
    // .addCase()
  },
});

export default reposSlise.reducer;
