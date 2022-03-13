import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest, call } from 'redux-saga/effects';
import * as authApi from '../lib/api/auth';

const initialState = {
    username: '',
    password: '',
    auth: null,
    authError: null,
    checkError: null,
};

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const INITIALIZE_AUTH = 'auth/INITIALIZE_AUTH';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('auth/CHECK');
const LOGOUT = 'user/LOGOUT';

export const check = createAction(CHECK);
export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({ key: key, value: value }));
export const initializeForm = createAction(INITIALIZE_FORM);
export const initializeAuth = createAction(INITIALIZE_AUTH);
export const login = createAction(LOGIN, ({ username, password }) => ({ username: username, password: password }));
export const logout = createAction(LOGOUT);

function* logoutSaga() {
    yield call(authApi.logout);
}

export function* authSaga() {
    yield takeLatest(CHECK, createRequestSaga(CHECK, authApi.check));
    yield takeLatest(LOGIN, createRequestSaga(LOGIN, authApi.login));
    yield takeLatest(LOGOUT, logoutSaga);
}

const auth = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: { key, value } }) => {
            return produce(state, (draft) => {
                draft[key] = value;
            });
        },
        [INITIALIZE_FORM]: (state) => {
            return produce(state, (draft) => {
                draft['username'] = '';
                draft['password'] = '';
            });
        },
        [INITIALIZE_AUTH]: (state) => {
            return produce(state, (draft) => {
                draft.auth = null;
                draft.authError = null;
                draft.checkError = null;
            });
        },
        [LOGIN_SUCCESS]: (state, { payload: auth }) => {
            return produce(state, (draft) => {
                draft.auth = auth;
                draft.authError = null;
                draft.checkError = null;
            });
        },
        [LOGIN_FAILURE]: (state, { payload: error }) => {
            return produce(state, (draft) => {
                draft.auth = null;
                draft.authError = error;
            });
        },
        [CHECK_SUCCESS]: (state, { payload: auth }) => {
            return produce(state, (draft) => {
                draft.auth = auth;
                draft.checkError = null;
            });
        },
        [CHECK_FAILURE]: (state, { payload: error }) => {
            return produce(state, (draft) => {
                draft.auth = null;
                draft.checkError = error;
            });
        },
        [LOGOUT]: (state) => {
            return produce(state, (draft) => {
                draft.auth = null;
            });
        },
    },
    initialState
);

export default auth;
