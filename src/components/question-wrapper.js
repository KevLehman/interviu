import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

export default ({
  tech,
  level,
  questions = [],
  interviewMode = false,
  screeningMode = false,
}) => {
  const [fullName, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [aprLevel, setAprLevel] = useState("")
  const [answers, setAnswers] = useState({})
  const [interviewer, setInterviewer] = useState("")

  useEffect(() => {
    setFullname("")
    setInterviewer("")
    setEmail("")
    setAprLevel("")
    setAnswers({})
  }, [interviewMode])

  useEffect(() => {
    setAnswers({})
  }, [tech, level])

  const handleChange = event => {
    const { id, value } = event.target
    const [key, type] = id.split(":")

    const modifiedKey = type === "apr" ? "appreciation" : "overall"
    const obj = {
      ...answers[key],
      [modifiedKey]: value,
    }

    setAnswers({ ...answers, [key]: obj })
  }

  const handleSubmit = event => {
    event.preventDefault()

    firebase
      .firestore()
      .collection("candidates")
      .doc(`${email}${screeningMode ? "-screening" : ""}-${tech}-${level}`)
      .set({
        questionList: questions.map(({ question }) => question),
        candidateAnswers: answers,
        interviewer,
        fullName,
        email,
        tech,
        level,
        appreciatedLevel: aprLevel,
        interviewedAt: new Date().toString(),
      })
      .then(() => console.log(`Candidate review saved for ${tech}@${level}`))

    setAprLevel("")
    setAnswers({})
  }

  return (
    <div className="mt-6">
      <div className="w-full h-auto mb-6 flex items-baseline flex-row flex-wrap">
        <form
          onSubmit={handleSubmit}
          className={!interviewMode ? "hidden" : ""}
        >
          <label className="w-2/4">
            Interviewer Name:
            <input
              type="text"
              value={interviewer}
              onChange={event => setInterviewer(event.target.value)}
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="w-2/4">
            Full name:
            <input
              type="text"
              value={fullName}
              onChange={event => setFullname(event.target.value)}
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="w-2/4">
            Email:
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="w-2/4">
            Appreciated level:
            <input
              type="text"
              value={aprLevel}
              onChange={event => setAprLevel(event.target.value)}
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Interview
          </button>
        </form>
      </div>
      <div className="w-full border-2 border-solid p-6 mt-10 mb-10">
        <h3 className="text-xl font-semibold text-header">
          Showing questions for{" "}
          <span className="uppercase underline">{tech}</span> designed for{" "}
          <span className="uppercase underline">{level}</span> devs
        </h3>
        <div className="border-b-2 mt-3 mb-3"></div>
        {(questions || []).map(({ question, answer }, idx) => (
          <div key={idx} className="mt-3 mb-3">
            <h6 className="text-lg text-black mb-3 font-questions">{`${
              idx + 1
            }. ${question}`}</h6>
            <p className="text-sm text-gray-700 font-answer">{answer}</p>
            <div
              className={`flex flex-row w-full mt-2 ${
                !interviewMode ? "hidden" : ""
              }`}
            >
              <label>
                Overall evaluation:
                <select
                  id={`question-${idx}:ovr`}
                  onChange={handleChange}
                  value={
                    answers[`question-${idx}`]
                      ? answers[`question-${idx}`].overall
                      : ""
                  }
                  className="mb-4 shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="deficient">Deficient</option>
                  <option value="below-average">Below Average</option>
                  <option value="average">Average</option>
                  <option value="above-average">Above Average</option>
                  <option value="proficient">Proficient</option>
                </select>
              </label>
              <label>
                Interviewer appreciation:
                <input
                  id={`question-${idx}:apr`}
                  type="text"
                  value={
                    answers[`question-${idx}`]
                      ? answers[`question-${idx}`].appreciation
                      : ""
                  }
                  onChange={handleChange}
                  className="mb-4 shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
