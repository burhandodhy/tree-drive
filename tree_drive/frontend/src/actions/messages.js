import { CREATE_MESSAGES } from "../actionTypes/messages";

export const createMessage = msg => {
  return {
    type: CREATE_MESSAGES,
    payload: msg
  };
};
