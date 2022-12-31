import { QUIZ_ACTIONS_TYPE } from '../../helper/Constants';

export const quizActions = {
    updateQuizData,
    clearQuizData,
};

function updateQuizData(data) {
    return {
        type: QUIZ_ACTIONS_TYPE.UPDATE_QUIZ_DATA,
        payload: {
            data: [
                ...data
            ]
        }
    }
}

function clearQuizData() {
    return {
        type: QUIZ_ACTIONS_TYPE.QUIT_QUIZ,
        payload: {
            data: []
        }
    }
}