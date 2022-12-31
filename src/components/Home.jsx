import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <div className="">Quiz App</div>
      <button className="btn btn-success px-5 rounded" onClick={() => navigate("/quiz")}>Play</button>
    </div>
  )
}

export default Home