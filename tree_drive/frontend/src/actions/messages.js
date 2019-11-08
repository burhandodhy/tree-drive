import { CREATE_MESSAGES } from "../actionTypes/messages";
import { GET_ERRORS } from "../actionTypes/errors";

export const createMessage = msg => {
  return {
    type: CREATE_MESSAGES,
    payload: msg
  };
};

export const createError = (msg, status) => {
    return {
      type: GET_ERRORS,
      payload: { msg, status }
    };
}
