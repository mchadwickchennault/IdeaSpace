import {
  RECEIVE_IDEAS,
  LOADING_IDEAS,
  IDEA_SAVED,
  IDEAS_ERROR,
  DUPLICATE_TITLE,
} from '../types/types';

const initState = {
  ideas: [],
  loading: false,
  hasError: false,
  dupTitle: false,
  error: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING_IDEAS:
      return { ...state, loading: true, hasError: false };
    case IDEA_SAVED:
      return { ...state, loading: false, hasError: false, dupTitle: false };
    case RECEIVE_IDEAS:
      return { ...state, ideas: action.payload, loading: false, hasError: false };
    case IDEAS_ERROR:
      return { ...state, hasError: true, error: action.error };
    case DUPLICATE_TITLE:
      return { ...state, dupTitle: true, loading: false };
    default:
      return state;
  }
};
