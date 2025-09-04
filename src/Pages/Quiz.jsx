import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const QUESTIONS_API = 'https://opentdb.com/api.php?amount=10&type=multiple'

function decode(str) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

const TIMER_DURATION = 30 // seconds

const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [timer, setTimer] = useState(TIMER_DURATION)
  const timerRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(QUESTIONS_API)
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(q => {
          const options = [...q.incorrect_answers, q.correct_answer]
            .map(decode)
            .sort(() => Math.random() - 0.5)
          return {
            question: decode(q.question),
            options,
            correct: decode(q.correct_answer),
          }
        })
        setQuestions(formatted)
        setLoading(false)
      })
  }, [])

  // Timer logic
  useEffect(() => {
    setTimer(TIMER_DURATION)
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleNext(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line
  }, [current, loading])

  const handleSelect = (option) => {
    const newAnswers = [...answers]
    newAnswers[current] = option
    setAnswers(newAnswers)
  }

  const handleNext = (auto = false) => {
    clearInterval(timerRef.current)
    if (current < questions.length - 1) setCurrent(current + 1)
    else navigate('/results', { state: { questions, answers } })
  }

  const handlePrev = () => {
    clearInterval(timerRef.current)
    if (current > 0) setCurrent(current - 1)
  }

  if (loading) return <div className="p-8 text-center" style={{
    padding: "32px"
  }}>Loading...</div>
  if (!questions.length) return <div className="p-8 text-center" style={{padding:"32px"}}>No questions found.</div>

  const q = questions[current]
  const selected = answers[current]
  const timerPercent = (timer / TIMER_DURATION) * 100

  // Navigation menu data
  const totalQuestions = questions.length
  const answeredCount = answers.filter(a => a !== undefined).length
  const leftCount = totalQuestions - answeredCount

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gradient-to-br from-cyan-100 to-purple-200 font-sans p-4" style={{padding:"16px"}}>
      {/* Main quiz area */}
      <div className="flex flex-col items-center w-full max-w-xl">
        {/* Timer Bar */}
        <div className="w-[98vw] mb-4 absolute top-1 left-1">
          <div className="h-4 bg-gray-300 rounded-full overflow-hidden relative">
            <div
              className="h-4 bg-purple-600 transition-all"
              style={{
                width: `${timerPercent}%`,
                position: 'absolute',
                left: 0,
                top: 0,
                transition: 'width 0.5s linear'
              }}
            />
          </div>
          <div className="text-center text-x text-gray-700 mt-1" style={{marginTop:"4px"}}>{timer}s left</div>
        </div>
        <div className="w-full bg-gray-400 rounded-lg shadow-lg p-8" style={{padding:"32px"}}>
          <div className="mb-4 text-gray-700 font-bold text-lg" style={{marginBottom:"16px"}}>
            Question {current + 1} / {questions.length}
          </div>
          <div className="mb-6 text-2xl font-semibold" style={{marginBottom:"24px"}}>{q.question}</div>
          <div className="grid gap-4 mb-8" style={{marginBottom:"24px"}}>
            {q.options.map(opt => (
              <button
                key={opt}
                className={`px-4 py-2 rounded border ${selected === opt ? 'bg-purple-600 text-gray-700' : 'bg-gray-800'}`}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                style={{padding:"8px 16px"}}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 rounded bg-gray-300"
              onClick={handlePrev}
              disabled={current === 0}
              style={{padding:"8px 16px"}}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded bg-purple-600 text-white"
              onClick={() => handleNext()}
              disabled={!selected}
              style={{padding:"8px 16px"}}
            >
              {current === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
          <div className="mt-6 text-gray-600" style={{marginTop:"24px"}}>
            Score: {answers.filter((a, i) => a === questions[i]?.correct).length} / {questions.length}
          </div>
        </div>
      </div>
      {/* Navigation menu on right */}
      <div className="hidden md:flex flex-col ml-8 bg-white rounded-lg shadow-lg p-6 min-w-[180px] h-fit" style={{marginLeft:"64px", padding:"24px"}}>
        <h3 className="text-lg font-bold mb-4 text-purple-700" style={{marginBottom:"16px"}}>Quiz Progress</h3>
        <div className="mb-2 text-gray-800" style={{marginBottom:"8px"}}>
          <span className="font-semibold">Answered:</span> {answeredCount}
        </div>
        <div className="mb-2 text-gray-800"style={{marginBottom:"8px"}}>
          <span className="font-semibold">Left:</span> {leftCount}
        </div>
        <div className="mb-4 text-gray-800"style={{marginBottom:"16px"}}>
          <span className="font-semibold">Total:</span> {totalQuestions}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Questions:</span>
          <div className="flex flex-wrap gap-2 mt-2"style={{marginTop:"8px"}}>
            {questions.map((_, idx) => (
              <button
                key={idx}
                className={`w-8 h-8 rounded-full text-xs font-bold border
                  ${answers[idx] !== undefined ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}
                  ${idx === current ? 'ring-2 ring-purple-400' : ''}
                `}
                onClick={() => setCurrent(idx)}
                title={`Go to question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz