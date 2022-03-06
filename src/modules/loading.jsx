import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {};

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (requestType) => requestType);
export const finishLoading = createAction(FINISH_LOADING, (requestType) => requestType);

const loading = handleActions(
    {
        [START_LOADING]: (state, { payload: requestType }) => {
            return produce(state, (draft) => {
                draft[requestType] = true;
            });
        },
        [FINISH_LOADING]: (state, { payload: requestType }) => {
            return produce(state, (draft) => {
                draft[requestType] = false;
            });
        },
    },
    initialState
);

export default loading;
