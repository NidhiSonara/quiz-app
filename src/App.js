import { useEffect, useState } from "react";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function rearrangeOptions(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function App() {
  const [quizList, SetQuizList] = useState()
  const [currectQuestionIndex, SetCurrectQuestionIndex] = useState()
  const [steps, SetSteps] = useState("INITIAL")

  const startQuiz = () => {
    axios.get("https://opentdb.com/api.php?amount=20").then((data) => {
      if (data.status === 200) {
        let result = data?.data?.results?.map(r => {
          let options = [...r.incorrect_answers]
          options.push(r.correct_answer)
          rearrangeOptions(options)
          return (
            { ...r, selectedAnswer: "", options }
          )
        })
        SetQuizList(result)
        SetCurrectQuestionIndex(0)
        SetSteps("STARTED")
      }
    }).catch((error) => {
      SetSteps("INITIAL")
    })
  }

  const addSelctedAnswer = (option) => {
    let newPayload = [...quizList]
    newPayload[currectQuestionIndex]["selectedAnswer"] = option
    SetQuizList(newPayload)
  }
  return (
    <div className="position-relative vh-100 m-2">
      {steps === "INITIAL" ?
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="">Quiz App</div>
          <button className="btn btn-success px-5 rounded" onClick={() => startQuiz()}>Play</button>
        </div> :
        steps === "STARTED" ?
          <div className="position-absolute top-50 start-50 translate-middle text-center w-75 text-bg-light p-2 p-md-5 rounded">
            <div>Question{" "}({currectQuestionIndex + 1} of {quizList?.length})</div>
            <div>{quizList?.[currectQuestionIndex]?.question}</div>
            <div className="row">
              {quizList?.[currectQuestionIndex]?.options?.map((option, index) => (
                <div className="col-12 col-md-6 p-2 p-md-3" key={index}>
                  <button className={(quizList?.[currectQuestionIndex]?.selectedAnswer === option ? "btn-success" : "btn-primary") + " btn w-100"} onClick={() => addSelctedAnswer(option)}> {option}</button>
                </div>
              ))}
            </div>
            <button className="btn btn-primary m-1 m-md-3" onClick={() => SetCurrectQuestionIndex(currectQuestionIndex - 1)} disabled={currectQuestionIndex <= 0}>PREVIOUS</button>
            <button className="btn btn-danger m-1 m-md-3" onClick={() => SetSteps("COMPLETED")}>{currectQuestionIndex === (quizList?.length - 1) ? "SUBMIT" : "QUIT"}</button>
            <button className="btn btn-success m-1 m-md-3" onClick={() => SetCurrectQuestionIndex(currectQuestionIndex + 1)} disabled={currectQuestionIndex === (quizList?.length - 1)}>NEXT</button>
          </div>
          :
          <div className="position-absolute top-50 start-50 translate-middle text-center w-75">
            <div class="circle mx-auto">
              <div class="checkmark"></div>
            </div>
            Result
            <div className="text-bg-light p-2 p-md-5 rounded my-3">
              <div>{(100 * quizList?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizList?.length <= 30 ? "You need more Practice" :
                (100 * quizList?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizList?.length <= 60 ? "Keep Practicing!" : "Well Done!"} </div>
              <div>Your Score : {(100 * quizList?.filter((q) => q.selectedAnswer === q.correct_answer).length) / quizList?.length} %</div>
              <div className="d-flex align-items-end justify-content-between">
                <div className="text-start">Total Number of questions:</div>
                <div className="text-end">{quizList?.length}</div>
              </div>
              <div className="d-flex align-items-end justify-content-between">
                <div className="text-start">Number of attempted questions:</div>
                <div className="text-end">{quizList?.filter((q) => q.selectedAnswer !== "").length}</div>
              </div>
              <div className="d-flex align-items-end justify-content-between">
                <div className="text-start">Number of correct Answers:</div>
                <div className="text-end">{quizList?.filter((q) => q.selectedAnswer === q.correct_answer).length}</div>
              </div>
              <div className="d-flex align-items-end justify-content-between">
                <div className="text-start">Number of wrong Answers:</div>
                <div className="text-end">{quizList?.filter((q) => q.selectedAnswer !== q.correct_answer).length}</div>
              </div>
            </div>
            <button class="btn btn-outline-primary m-3" onClick={() => startQuiz()}>Play Again</button>
            <button class="btn btn-outline-success m-3" onClick={() => SetSteps("INITIAL")}>Back to Home</button>
          </div>
      }
    </div>
  );
}

export default App;
