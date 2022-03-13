import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import home, { homeSaga } from './home';

const rootReducer = combineReducers({
    auth,
    loading,
    home,
});

export function* rootSaga() {
    yield all([authSaga(), homeSaga()]);
}

export default rootReducer;
