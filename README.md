# InterviU
#### An application to store & manage interview questions for candidates. Also, featuring an interview mode, where you get 20 random questions to ask.

### How to use it
1. Pick a technology to interview
2. Pick a Seniority level (Jr, Md, Sr)
3. Enable (optional) interview mode, to randomize the questions
4. Enjoy it!

### How to add more questions? 
Questions are JSON files stored in `src/questions`. Each file should have the name of the technology (in lowercase, preferably). 

#### Structure of a JSON Question file
```json
{
  "level": [
    {
      "question": "blablabla",
      "answer": "blablabla"
    }
  ]
}
```
The key `level` can be any value of `junior` `medium` or `senior`. No key needed for `all` levels.

After creating the file, you should make it `available` for the app to use by requiring it in the `index.js` file of `/questions`.

#### Structure of `index.js` file

```js
module.exports = {
  [techName]: require('./file.json'),
}
```

Where `techName` should be replaced with the `lowercased` version of the tech name. Technologies with `spaces` in its name can be saved using quotes.

After that, make a Pull Request & wait for it to be deployed!