import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from '../container/Loader';
import api from "../helper/Api";
import { quizActions } from "../redux/actions/quiz.action";


function rearrangeOptions(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Quiz() {
  const [loading, setLoading] = useState(true);
  const quizData = useSelector((state) => state.quizReducer.quizData)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [currectQuestionIndex, SetCurrectQuestionIndex] = useState(0)

  useEffect(() => {
    if (quizData?.length <= 0) {
      api.get(`?amount=20`).then(async (res) => {
        if (res.status === 200) {
          let result = await res?.data?.results?.map(r => {
            let options = [...r.incorrect_answers]
            options.push(r.correct_answer)
            rearrangeOptions(options)
            return (
              { ...r, selectedAnswer: "", options }
            )
          })
          await dispatch(quizActions.updateQuizData(result))
          await SetCurrectQuestionIndex(0)
          await setLoading(false)
        }
      });
    } else {
      setLoading(false)
    }
  }, [quizData])

  const addSelctedAnswer = (option) => {
    let newPayload = [...quizData]
    newPayload[currectQuestionIndex]["selectedAnswer"] = option
    dispatch(quizActions.updateQuizData(newPayload))
  }
  return (
    <>
      {loading ?
        <Loader />
        :
        <div className="position-absolute top-50 start-50 translate-middle text-center w-75 text-bg-light p-2 p-md-5 rounded">
          <div>Question{" "}({Number(currectQuestionIndex) + 1} of {quizData?.length})</div>
          <div>{quizData?.[currectQuestionIndex]?.question}</div>
          <div className="row">
            {quizData?.[currectQuestionIndex]?.options?.map((option, index) => (
              <div className="col-12 col-md-6 p-2 p-md-3" key={index}>
                <button className={(quizData?.[currectQuestionIndex]?.selectedAnswer === option ? "btn-success" : "btn-primary") + " btn w-100"} onClick={() => addSelctedAnswer(option)}> {option}</button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary m-1 m-md-3" onClick={() => SetCurrectQuestionIndex(currectQuestionIndex - 1)} disabled={currectQuestionIndex <= 0}>PREVIOUS</button>
          <button className="btn btn-danger m-1 m-md-3" onClick={() => navigate("/result")}>{Number(currectQuestionIndex) === (quizData?.length - 1) ? "SUBMIT" : "QUIT"}</button>
          <button className="btn btn-success m-1 m-md-3" onClick={() => SetCurrectQuestionIndex(currectQuestionIndex + 1)} disabled={currectQuestionIndex === (quizData?.length - 1)}>NEXT</button>
        </div>
      }
    </>
  )
}

export default Quiz