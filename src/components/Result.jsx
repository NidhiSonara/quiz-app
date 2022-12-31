import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quizActions } from '../redux/actions/quiz.action';

function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const quizData = useSelector((state) => state.quizReducer.quizData)

  const handleQuiz = (route) => {
    dispatch(quizActions.clearQuizData())
    navigate(route)
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center w-75">
      <div className="circle mx-auto">
        <div className="checkmark"></div>
      </div>
      Result
      <div className="text-bg-light p-2 p-md-5 rounded my-3">
        <div>{(100 * quizData?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizData?.length <= 30 ? "You need more Practice" :
          (100 * quizData?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizData?.length <= 60 ? "Keep Practicing!" : "Well Done!"} </div>
        <div>Your Score : {(100 * quizData?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizData?.length} %</div>
        <div className="d-flex align-items-end justify-content-between">
          <div className="text-start">Total Number of questions:</div>
          <div className="text-end">{quizData?.length}</div>
        </div>
        <div className="d-flex align-items-end justify-content-between">
          <div className="text-start">Number of attempted questions:</div>
          <div className="text-end">{quizData?.filter((q) => q.selectedAnswer !== "").length}</div>
        </div>
        <div className="d-flex align-items-end justify-content-between">
          <div className="text-start">Number of correct Answers:</div>
          <div className="text-end">{quizData?.filter((q) => q.selectedAnswer === q.correct_answer).length}</div>
        </div>
        <div className="d-flex align-items-end justify-content-between">
          <div className="text-start">Number of wrong Answers:</div>
          <div className="text-end">{quizData?.filter((q) => q.selectedAnswer !== q.correct_answer).length}</div>
        </div>
      </div>
      <button className="btn btn-outline-primary m-3" onClick={() => handleQuiz("/quiz")}>Play Again</button>
      <button className="btn btn-outline-success m-3" onClick={() => handleQuiz("/")}>Back to Home</button>
    </div>
  )
}

export default Result