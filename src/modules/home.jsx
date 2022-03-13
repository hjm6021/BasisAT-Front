import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as homeAPI from '../lib/api/home';

const initialState = {
    id: null,
    description: '',
    homeInfoError: null,
};

const [GET_HOME, GET_HOME_SUCCESS, GET_HOME_FAILURE] = createRequestActionTypes('home/GET_HOME');

export const getHome = createAction(GET_HOME);

export function* homeSaga() {
    yield takeLatest(GET_HOME, createRequestSaga(GET_HOME, homeAPI.get_homeInfo));
}

const home = handleActions(
    {
        [GET_HOME_SUCCESS]: (state, { payload: home }) => {
            return produce(state, (draft) => {
                draft.id = home._id;
                draft.description = home.description;
                draft.homeInfoError = null;
            });
        },
        [GET_HOME_FAILURE]: (state, { payload: error }) => {
            return produce(state, (draft) => {
                draft.id = null;
                draft.description = '';
                draft.homeInfoError = error;
            });
        },
    },
    initialState
);

export default home;
