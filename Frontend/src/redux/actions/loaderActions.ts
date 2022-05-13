import { loaderTypes } from "../types/loaderTypes";

export const startLoadingShow = () => ({
  type: loaderTypes.START_LOADING_SHOW,
});

export const stopLoadingShow = () => ({
  type: loaderTypes.STOP_LOADING_SHOW,
});
