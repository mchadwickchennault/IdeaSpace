import fetch from 'node-fetch';

import {
  RECEIVE_IDEAS,
  IDEAS_ERROR,
  LOADING_IDEAS,
  IDEA_SAVED,
  DUPLICATE_TITLE,
} from '../types/types';

const receiveIdeas = responseJson => ({
  type: RECEIVE_IDEAS,
  payload: responseJson,
});

const ideasError = error => ({
  type: IDEAS_ERROR,
  error,
});

const duplicateTile = () => ({ type: DUPLICATE_TITLE });

const loadingIdeas = () => ({ type: LOADING_IDEAS });


export const ideaSaved = () => ({ type: IDEA_SAVED });

export const getIdeas = () => {
  return (dispatch) => {
    dispatch(loadingIdeas());
    return fetch('/api/ideas')
      .then(response => response.json())
      .then(json => dispatch(receiveIdeas(json)))
      .catch((error) => {
        dispatch(ideasError(error));
      });
  };
};

export const postIdea = (body, history) => {
  return (dispatch) => {
    dispatch(loadingIdeas());
    return fetch(
      '/api/ideas',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((response) => {
        if (response.ok) {
          history.push('/');
          dispatch(ideaSaved());
        } else if (response.status === 301) {
          dispatch(duplicateTile());
        }
      })
      .catch((error) => {
        dispatch(ideasError(error));
      });
  };
};
