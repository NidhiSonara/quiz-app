import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quizActions } from '../redux/actions/quiz.action';

function FourOFour() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleQuiz = (route) => {
    dispatch(quizActions.clearQuizData())
    navigate(route)
  }
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center w-75">
      404
      <div className="text-bg-light p-2 p-md-5 rounded my-3">
        <div>Opps!</div>
        <div>Page not found!</div>
        <button className="btn btn-outline-primary m-3" onClick={() => handleQuiz("/quiz")}>Play Quiz</button>
        <button className="btn btn-outline-success m-3" onClick={() => handleQuiz("/")}>Back to Home</button>
      </div>
    </div>
  )
}

export default FourOFour