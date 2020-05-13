import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import QuestionWrapper from "../components/question-wrapper"

import Layout from "../components/layout"
import SEO from "../components/seo"

function mergeQuestions(jsonQuestions = {}) {
  return Object.keys(jsonQuestions).reduce((all, current) => {
    return [...all, ...jsonQuestions[current]]
  }, [])
}

function prepareInterview(questions = [], limit = 20) {
  const maxQuestions = limit > questions.length ? questions.length : limit
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, maxQuestions)
}

function filterScreeningQuesitons(questions) {
  return questions.filter(q => q.screening)
}

const IndexPage = () => {
  const levels = ["junior", "medium", "senior", "all"]

  const [tech, setTech] = useState("node")
  const [level, setLevel] = useState("all")
  const [interv, setInterv] = useState(false)
  const [questions, setQuestions] = useState([])
  const [screening, setScreening] = useState(false)
  const [technologies, setTechnologies] = useState([])

  /*   useEffect(() => { // store data in a collection
    const questionCollection = firebase
      .firestore()
      .collection('questions')
      
    Object.keys(Questions)
      .map(key => {
        questionCollection
          .doc(key)
          .set(Questions[key]);
      })
  }) */

  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .get()
      .then(values => {
        const dbTechnologies = new Set()
        values.forEach(value => {
          dbTechnologies.add(value.id)
        })

        setTechnologies([...dbTechnologies])
      })
  }, [])

  useEffect(() => {
    firebase
      .firestore()
      .collection(`questions`)
      .doc(tech)
      .get()
      .then(value => {
        const dbQuestions = value.data()
        const techQuestions =
          level !== "all" ? dbQuestions[level] : mergeQuestions(dbQuestions)
        setQuestions(techQuestions)
      })
  }, [tech, level])

  let techQuestions = interv ? prepareInterview(questions) : questions
  techQuestions = screening
    ? filterScreeningQuesitons(techQuestions)
    : techQuestions

  return (
    <Layout>
      <SEO title="Home" />
      <h3 className="mt-4 text-xl">1. Select a technology from the list</h3>
      <p className="text-xs text-gray-800 mb-4">
        Technology instead of language to keep the tool open to extensions
      </p>
      <div className="w-full h-auto mb-4 flex items-baseline flex-row flex-wrap">
        {technologies.map((lang, index) => (
          <button
            key={`${lang}-${index}`}
            className={`badge bg-green-200 ${
              tech === lang ? "bg-green-800 text-white" : "text-green-800"
            }`}
            onClick={() => setTech(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <h3 className="mt-4 text-xl">2. Select the level of the questions</h3>
      <p className="text-xs text-gray-800 mb-4">
        We use the 3 base levels: Junior, Mid and Senior levels. Additionally,
        you can select 'ALL' that will show questions for all levels. This is
        useful if you want to interview a developer and you're not sure about
        its current level
      </p>
      <div className="w-full h-auto mb-4 flex items-baseline flex-row flex-wrap">
        {levels.map((sLevel, index) => (
          <button
            key={`${sLevel}-${index}`}
            className={`badge bg-red-200 ${
              level === sLevel ? "bg-red-800 text-white" : "text-red-800"
            }`}
            onClick={() => setLevel(sLevel)}
          >
            {sLevel}
          </button>
        ))}
      </div>
      <h3 className=" mt-4 text-xl">3. Optionally, enable Interview Mode</h3>
      <p className="text-xs text-gray-800 mb-4">
        Interview mode will take 10 random questions from the criteria you
        defined. For example, if you selected Node@Junior, the 10 questions will
        be for that level
      </p>
      <div className="w-full h-auto mb-4 flex items-baseline flex-row flex-wrap">
        <button
          className={`badge bg-blue-200 ${
            interv ? "bg-blue-800 text-white" : "text-blue-800"
          }`}
          onClick={() => setInterv(!interv)}
        >
          {interv ? "Interviewing" : "No interview"}
        </button>
        <button
          className={`badge bg-blue-200 ${
            screening ? "bg-blue-800 text-white" : "text-blue-800"
          }`}
          onClick={() => setScreening(!screening)}
        >
          {screening ? "Screening" : "No screening"}
        </button>
      </div>
      <QuestionWrapper
        tech={tech}
        level={level}
        interviewMode={interv}
        screeningMode={screening}
        questions={techQuestions}
      />
    </Layout>
  )
}

export default IndexPage
