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
{ "tech": 
  {
    "level": [
      {
        "question": "blablabla",
        "answer": "blablabla"
      }
    ]
  }
}
```

The `tech` key is the `id` for the firebase document. This should be written in lowercase to avoid issues. 

The key `level` can be any value of `junior` `medium` or `senior`. No key needed for `all` levels.

After creating the question list, just refresh the page and they should be there!

### How to contribute

1. **Install the Gatsby CLI.**

   ```shell
   npm install -g gatsby-cli
   ```

2. **Fork and clone this project.**

3. **Copy `.env.example` to `.env`**

4. **Set the environment variables to your own Firebase API keys**

3. **Start the site in `develop` mode.**

   ```shell
   cd interviu/
   gatsby develop
   ```

4. **Open the source code and start editing!**

   The site should be running at `http://localhost:8000`.

At this point, you’ve got the project working. After that, make a Pull Request & wait for it to be deployed!
