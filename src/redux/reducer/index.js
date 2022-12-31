import { combineReducers } from 'redux';

import { quizReducer } from './quiz.reducer';

const rootReducer = combineReducers({
    quizReducer
});

export default rootReducer;