/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { AppConfig, LoadStatus } from "types";
import { getConfig } from ".";

interface UseWithConfig {
  config: AppConfig | undefined;
  isConfigLoaded: boolean;
  loadConfig: () => void;
}

export function useWithConfig(): UseWithConfig {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.config);

  useEffect(() => {
    loadConfig();
  }, []);

  function loadConfig() {
    if (
      state.status === LoadStatus.NONE ||
      state.status === LoadStatus.FAILED
    ) {
      dispatch(getConfig());
    }
  }

  return {
    config: state.config,
    isConfigLoaded: state.status === LoadStatus.SUCCEEDED,
    loadConfig,
  };
}
