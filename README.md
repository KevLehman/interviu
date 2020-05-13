# InterviU

#### An application to store & manage interview questions for candidates. Also, featuring an interview mode, where you get 20 random questions to ask.

### How to use it

1. Pick a technology to interview
2. Pick a Seniority level (Jr, Md, Sr)
3. Enable (optional) interview mode, to randomize the questions
4. Enjoy it!

### How to add more questions?

Questions are stored in a Firebase FireStore collection called `questions`. You can create your own and add questions there. There's still a pending work to enable you to add questions through the UI

#### Structure of Questions collection

```json
{
  "tech": {
    "level": [
      {
        "question": "blablabla",
        "answer": "blablabla",
        "screening": false
      }
    ]
  }
}
```

The `tech` key is the `id` for the firebase document. This should be written in lowercase to avoid issues.

The key `level` can be any value of `junior` `medium` or `senior`. No key needed for `all` levels.

After creating the question list, just refresh the page and they should be there!

#### Screening questions

App supports Screening mode, where a set of questions previously defined as useful for screening will be shown for the interviewer. This screening questions also take into consideration the `level` of the question, so you will see different screening questions for each level. The amount of them may vary too.

If a question is marked as `"screening": true` it will still show up with the other questions. There's no difference in the interview mode for screening questions

#### Structure of Candidate collection

```json
{
  "candidateEmail-tech-screening-level": {
    "appreciatedLevel": string
    "candidateAnswers": Array<Object> {
      "question-id": {
        "appreciation": string,
        "overall": string
      }
    },
    "fullName": string,
    "interviewer": string,
    "interviewedAt": string,
    "level": string,
    "questionList": Array<string>,
    "tech": string
  }
}
```

Each candidate is represented with this structure to having all the required information for a user. Currently, each candidate supports a Screening session & an interview session.
There's a plan to support multiple interviews per user, but this is not possible yet. Even when you can save multiple interviews, the Reporting section will show just the last interview.

### How to contribute

1. **Install the Gatsby CLI.**

   ```shell
   npm install -g gatsby-cli
   ```

2. **Fork and clone this project.**

3. **Copy `.env.example` to `.env`**

4. **Set the environment variables to your own Firebase API keys**

5. **Start the site in `develop` mode.**

   ```shell
   cd interviu/
   gatsby develop
   ```

6. **Open the source code and start editing!**

   The site should be running at `http://localhost:8000`.

At this point, you’ve got the project working. After that, make a Pull Request & wait for it to be deployed!
