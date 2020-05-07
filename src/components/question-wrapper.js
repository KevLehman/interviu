import React, { useState, useEffect } from 'react';

export default ({ tech, level, questions = [] }) => {
  return (
    <div className="w-full border-2 border-solid p-6 mt-10 mb-10">
      <h3 className="text-xl font-semibold text-header">Showing questions for <span className="uppercase">{tech}</span> designed for <span className="uppercase">{level}</span> devs</h3>
      <div className="border-b-2 mt-3 mb-3"></div>
      {(questions || []).map(({question, answer}, idx) => (
        <div className="mt-3 mb-3">
          <h6 className="text-lg text-black mb-3 font-questions">{`${idx+1}. ${question}`}</h6>
          <p className="text-sm text-gray-700 font-answer">{answer}</p>
        </div>
      ))}
    </div>
  )
}