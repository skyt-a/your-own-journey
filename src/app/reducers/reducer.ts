import { User } from 'firebase';
import * as types from '../actionTypes/ActionTypes';
import { db } from '../firebaseInit';

export interface StoreState {
  user?: User;
  userInfo?: any;
}

export const initialState: StoreState = {
  user: null,
  userInfo: null,
};

export const reducer = (state: StoreState, action: any): StoreState => {
  switch (action.type) {
    case types.SIGN_IN:
      const { user, userInfo } = action;
      return {
        ...state,
        user,
        userInfo,
      };
    default:
      return state;
  }
};
