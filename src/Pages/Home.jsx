import React from 'react'
import { useNavigate } from 'react-router-dom'

const thinkingBoyImageUrl = "/Gemini_Generated_Image_4winxt4winxt4win.png"

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        @keyframes float { 0% {transform: translateY(0px);} 50% {transform: translateY(-20px);} 100% {transform: translateY(0px);} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes fadeInDown { from {opacity: 0;transform: translateY(-25px);} to {opacity: 1;transform: translateY(0);} }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-purple-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans" style={{padding:"16px"}}>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-y-12 lg:gap-x-16">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-800 tracking-tighter animate-fade-in-down" style={{ animationDelay: '0.2s', opacity: 0 }}>
              WELCOME
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-lg mx-auto lg:mx-0 animate-fade-in-down" style={{ animationDelay: '0.4s', opacity: 0, marginTop: "16px" }}>
              Ready to challenge your mind? Dive into a world of fun quizzes and trivia!
            </p>
            <button
              className="mt-10 px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transform transition-all duration-300 hover:scale-105 flex items-center justify-center mx-auto lg:mx-0 animate-fade-in-down"
              style={{ animationDelay: '0.6s', opacity: 0, marginTop: "2.5rem", padding: "16px 32px" }}
              onClick={() => navigate('/quiz')}
            >
              Start Quiz
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center order-1 lg:order-2">
            <img src={thinkingBoyImageUrl} alt="Boy thinking with imagination flowing out" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full animate-float" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home