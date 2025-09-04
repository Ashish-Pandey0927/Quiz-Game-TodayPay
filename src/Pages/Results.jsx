import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Results = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state || !state.questions || !state.answers) {
    return <div className="p-8 text-center" style={{padding:"32px"}}>No results to show.</div>
  }

  const { questions, answers } = state
  const score = answers.filter((a, i) => a === questions[i].correct).length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 to-purple-200 font-sans p-4" style={{padding:"8px"}}>
      <div className="max-w-xl w-full bg-gray-500 rounded-lg shadow-lg p-8"style={{padding:"32px"}}>
        <h2 className="text-3xl font-bold mb-6" style={{marginBottom:"24px"}}>Results</h2>
        <div className="mb-4 text-lg font-semibold"style={{marginBottom:"24px"}}>
          You scored {score} / {questions.length}
        </div>
        <ul className="mb-8"style={{marginBottom:"32px"}}>
          {questions.map((q, i) => (
            <li key={i} className="mb-4" style={{marginBottom:"16px"}}>
              <div className="font-semibold">{q.question}</div>
              <div>
                Your answer: <span className={answers[i] === q.correct ? 'text-green-600' : 'text-red-600'}>{answers[i]}</span>
              </div>
              <div>
                Correct answer: <span className="text-green-600">{q.correct}</span>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="px-6 py-3 rounded bg-purple-600 text-white font-semibold"
          onClick={() => navigate('/quiz')}
          style={{padding:"12px 24px"}}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  )
}

export default Results