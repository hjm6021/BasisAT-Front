import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { call, takeLatest } from 'redux-saga/effects';
import * as authApi from '../lib/api/auth';

const initialState = {
    user: null,
    checkError: null,
};

const TMP_SET_USER = 'user/TMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tmpSetUser = createAction(TMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

function checkFailureSaga() {
    try {
        sessionStorage.removeItem('user');
    } catch (e) {
        console.log('sessionStorage is not working');
    }
}

function* logoutSaga() {
    yield call(authApi.logout);
}

export function* userSaga() {
    yield takeLatest(CHECK, createRequestSaga(CHECK, authApi.check));
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const user = handleActions(
    {
        [TMP_SET_USER]: (state, { payload: user }) => {
            return produce(state, (draft) => {
                draft.user = user;
            });
        },
        [CHECK_SUCCESS]: (state, { payload: user }) => {
            return produce(state, (draft) => {
                draft.user = user;
                draft.checkError = null;
            });
        },
        [CHECK_FAILURE]: (state, { payload: error }) => {
            return produce(state, (draft) => {
                draft.user = null;
                draft.checkError = error;
            });
        },
        [LOGOUT]: (state) => {
            return produce(state, (draft) => {
                draft.user = null;
            });
        },
    },
    initialState
);

export default user;
