import React from "react"
import Questions from "../questions"

function mergeQuestions(jsonQuestions = {}) {
  return Object.keys(jsonQuestions).reduce((all, current) => {
    return all.push(...jsonQuestions[current]) && all
  }, [])
}

function prepareInterview(questions = [], limit = 20) {
  const maxQuestions = limit > questions.length ? questions.length : limit
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, maxQuestions)
}

export default ({ tech, level, isInterview = false }) => {
  const questionFile = Questions[tech.toLowerCase()] || {}
  let questions =
    level !== "all" ? questionFile[level] : mergeQuestions(questionFile)

  if (isInterview) {
    questions = prepareInterview(questions)
  }

  return (
    <div className="w-full border-2 border-solid p-6 mt-10 mb-10">
      <n3 className="text-xl font-semibold text-header">
        Showing questions for <span className="uppercase">{tech}</span> designed
        for <span className="uppercase">{level}</span> devs
      </n3>
      <div className="border-b-2 mt-3 mb-3"></div>
      {(questions || []).map(({ question, answer }, idx) => (
        <div className="mt-3 mb-3">
          <h6 className="text-lg text-black mb-3 font-questions">{`${
            idx + 1
          }. ${question}`}</h6>
          <p className="text-sm text-gray-700 font-answer">{answer}</p>
        </div>
      ))}
    </div>
  )
}
