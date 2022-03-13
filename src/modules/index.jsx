import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import home, { homeSaga } from './home';
const rootReducer = combineReducers({
    auth,
    loading,
    user,
    home,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), homeSaga()]);
}

export default rootReducer;
