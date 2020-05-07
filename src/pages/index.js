import React, { useState } from "react"
import QuestionWrapper from "../components/question-wrapper"
import Questions from "../questions"

import Layout from "../components/layout"
import SEO from "../components/seo"

const currentTechnologies = Object.keys(Questions)
const levels = ["junior", "medium", "senior", "all"]

const IndexPage = () => {
  const [tech, setTech] = useState("node")
  const [level, setLevel] = useState("all")
  const [interv, setInterv] = useState(false)

  return (
    <Layout>
      <SEO title="Home" />
      <h3 className="mt-8 text-xl">1. Select a technology from the list</h3>
      <p className="text-xs text-gray-800 mb-8">
        Technology instead of language to keep the tool open to extensions
      </p>
      <div className="w-full h-auto mb-6 flex items-baseline flex-row flex-wrap">
        {currentTechnologies.map((lang, index) => (
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
      <h3 className="mt-8 text-xl">2. Select the level of the questions</h3>
      <p className="text-xs text-gray-800 mb-8">
        We use the 3 base levels: Junior, Mid and Senior levels. Additionally,
        you can select 'ALL' that will show questions for all levels. This is
        useful if you want to interview a developer and you're not sure about
        its current level
      </p>
      <div className="w-full h-auto mb-6 flex items-baseline flex-row flex-wrap">
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
      <h3 className=" mt-8 text-xl">3. Optionally, enable Interview Mode</h3>
      <p className="text-xs text-gray-800 mb-8">
        Interview mode will take 10 random questions from the criteria you
        defined. For example, if you selected Node@Junior, the 10 questions will
        be for that level
      </p>
      <div className="w-full h-auto mb-6 flex items-baseline flex-row flex-wrap">
        <button
          className={`badge bg-blue-200 ${
            interv ? "bg-blue-800 text-white" : "text-blue-800"
          }`}
          onClick={() => setInterv(!interv)}
        >{`${interv}`}</button>
      </div>
      <QuestionWrapper tech={tech} level={level} isInterview={interv} />
    </Layout>
  )
}

export default IndexPage
