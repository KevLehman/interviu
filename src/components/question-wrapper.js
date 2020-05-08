import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

export default ({ tech, level, questions = [], interviewMode = false }) => {
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [aprLevel, setAprLevel] = useState('');
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setFullname('');
    setEmail('');
    setAprLevel('');
    setAnswers({});
  }, [interviewMode])

  useEffect(() => {
    setAnswers({})
  }, [tech, level])

  const handleChange = (event) => {
    const { id, value } = event.target;
    setAnswers({ ...answers, [id]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("candidates")
      .doc(`${email}-${tech}-${level}`)
      .set({
        questionList: questions.map(({question}) => question),
        candidateAnswers: answers,
        fullName,
        appreciatedLevel: aprLevel,
        interviewedAt: new Date().toString(),
      })
      .then(() => console.log(`Candidate review saved for ${tech}@${level}`))

      setAprLevel('');
      setAnswers({});
  }

  return (
    <div className="mt-10">
      <div className="w-full h-auto mb-6 flex items-baseline flex-row flex-wrap">
        <form onSubmit={handleSubmit} className={!interviewMode ? 'hidden': ''}>
          <label>
            Full name:
            <input 
              type="text"
              value={fullName} 
              onChange={(event) => setFullname(event.target.value)} 
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label>
            Appreciated level:
            <input 
              type="text" 
              value={aprLevel} 
              onChange={(event) => setAprLevel(event.target.value)} 
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
            <label className={ !interviewMode ? 'hidden' : ''}>
              Interviewer appreciation:
              <input
                id={`question-${idx}`}
                type="text"
                value={answers[`question-${idx}`] || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
