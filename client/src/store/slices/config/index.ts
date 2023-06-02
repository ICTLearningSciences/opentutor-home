/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAppConfig } from "api";
import { AppConfig, LoadStatus } from "types";

export interface ConfigState {
  config?: AppConfig;
  status: LoadStatus;
}

const initialState: ConfigState = {
  status: LoadStatus.NONE,
};

export const getConfig = createAsyncThunk("config/config", async () => {
  return await fetchAppConfig();
});

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        state.status = LoadStatus.IN_PROGRESS;
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = LoadStatus.SUCCEEDED;
      })
      .addCase(getConfig.rejected, (state) => {
        state.status = LoadStatus.FAILED;
      });
  },
});

export default configSlice.reducer;
