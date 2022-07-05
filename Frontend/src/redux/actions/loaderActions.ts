import { loaderTypes } from "../types/loaderTypes";

export const showLoader = () => ({
  type: loaderTypes.START_LOADING_SHOW,
});

export const hideLoader = () => ({
  type: loaderTypes.STOP_LOADING_SHOW,
});
