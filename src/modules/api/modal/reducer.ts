import { ACTIONS_MODAL } from "../../actionsType";

export type stateType = {
  modalStatus: boolean;
  modalName: string;
};

export const initialState = {
  modalStatus: false,
  modalName: "",
};

export const modalNameReducer = (
  state: stateType = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ACTIONS_MODAL.MODAL_NAME: {
      return {
        modalName: action.payload,
      };
    }
    default:
      return state;
  }
};

export const modalStatusReducer = (
  state: stateType = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ACTIONS_MODAL.MODAL_STATUS: {
      return {
        modalStatus: action.payload,
      };
    }
    default:
      return state;
  }
};