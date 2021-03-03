import * as actionTypes from "../types";

export const updateProfile = (payload) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload,
  };
};
