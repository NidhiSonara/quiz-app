import { QUIZ_ACTIONS_TYPE } from '../../helper/Constants';

let initialState = {
    quizData: []
}

export function quizReducer(state = initialState, action) {
    switch (action.type) {
        case QUIZ_ACTIONS_TYPE.UPDATE_QUIZ_DATA:
            return {
                ...state,
                quizData: [...action.payload.data]
            }
        case QUIZ_ACTIONS_TYPE.QUIT_QUIZ:
            return {
                quizData: action.payload.data
            }
        default:
            return { ...state }
    }
}