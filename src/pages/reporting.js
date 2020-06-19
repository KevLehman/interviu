import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import Layout from '../components/layout';

const candidateApproved = (questions = {}) => {
  const performance = Object.keys(questions).reduce((acc, current) => {
    const { evaluatedScore } = questions[current];
    let key = 'fail';

    if (['average', 'above-average', 'proficient'].includes(evaluatedScore)) {
      key = 'pass';
    }

    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  // Hard logic to determine approval
  // based on having more than a half questions ranked as average or more
  return performance.pass > Object.keys(questions).length / 2 ? 'PASS' : 'FAIL';
};

const mergeQuestionAndAnswers = (questions = [], answers = {}) => Object.keys(answers).reduce((accum, key) => {
  const questionId = key.split('-')[1];
  accum[questionId] = {
    question: questions[questionId],
    performance: answers[key].appreciation,
    evaluatedScore: answers[key].overall,
  };
  return accum;
}, {});

export default () => {
  const [candidates, setCandidates] = useState({});
  const [canditeInfo, setCandidateInfo] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection('candidates')
      .get()
      .then((values) => {
        const candidateList = {};
        values.forEach((v) => {
          candidateList[v.id] = v.data();
        });
        setCandidates(candidateList);
      });
  }, []);

  useEffect(() => {
    const candidateObject = {};
    Object.keys(candidates).map((key) => {
      const isScreening = key.includes('screening');
      const {
        email,
        level,
        appreciatedLevel,
        interviewer,
        fullName,
        questionList,
        candidateAnswers,
        interviewedAt,
        tech,
      } = candidates[key];

      const tempObj = {
        level,
        tech,
        fullName,
        answers: mergeQuestionAndAnswers(questionList, candidateAnswers),
        notes: {
          appreciatedLevel,
          interviewer,
          interviewedAt,
        },
      };

      candidateObject[email] = {
        ...candidateObject[email],
        fullName,
        [isScreening ? 'screening' : 'interview']: tempObj,
      };
      return null;
    });

    setCandidateInfo(candidateObject);
  }, [candidates]);

  return (
    <Layout>
      <div className="w-full flex flex-col md:flex-row lg:flex-row mb-10">
        <div className="w-full md:w-2/5 lg:w-2/5 mr-10 shadow-lg justify-center">
          <h1 className="text-2xl text-center">Candidates</h1>
          {Object.keys(canditeInfo).map((candidate) => (
            <div className="m-auto mt-1 h-10 w-full">
              <h3
                id={candidate}
                role="button"
                onClick={(event) => setSelectedCandidate(event.target.id)}
                className="text-answers text-center leading-loose"
              >
                {`${canditeInfo[candidate].fullName} (${candidate})`}
              </h3>
              <div className="border mb-2" />
            </div>
          ))}
        </div>
        <div className="w-full mt-10 md:mt-0 lg:mt-0 md:w-3/5 lg:w-3/5">
          <h1 className="text-2xl text-center">Answers</h1>
          {selectedCandidate
            && Object.keys(canditeInfo[selectedCandidate] || {})
              .filter((e) => e !== 'fullName')
              .map((mode) => {
                const currentCandidateMode = canditeInfo[selectedCandidate][mode];
                return (
                  <div className="mb-2">
                    <h2 className="text-xl">
                      {mode}
                      {' '}
                      -
                      {currentCandidateMode.tech}
                      {' '}
                      -
                      {' '}
                      {candidateApproved(currentCandidateMode.answers)}
                    </h2>
                    <p>
                      Interviewer
                      {' '}
                      {currentCandidateMode.notes.interviewer}
                      {' '}
                      @
                      {' '}
                      {currentCandidateMode.notes.interviewedAt}
                    </p>
                    <div className="border mb-5" />
                    {Object.keys(currentCandidateMode.answers).map((answer) => (
                      <div className="mb-3">
                        <p className="text-lg">{currentCandidateMode.answers[answer].question}</p>
                        <p className="text-gray-800">
                          <span className="text-black underline">Overall: </span>
                          {currentCandidateMode.answers[answer].evaluatedScore}
                        </p>
                        <p className="text-gray-800">
                          <span className="text-black underline">Additional information: </span>
                          {currentCandidateMode.answers[answer].performance}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
        </div>
      </div>
    </Layout>
  );
};
