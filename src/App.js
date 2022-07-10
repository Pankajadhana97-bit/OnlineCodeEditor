import React, { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import spinner from './assets/spinner.webp';

function App() {

  const [userCode, setUserCode] = useState(``);
  const [userLang, setUserLang] = useState("cpp");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize
  }

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return
    }

    // Post request to compile endpoint
    Axios.post(`https://codersbayapi.herokuapp.com`, {
      code: userCode,
      language: userLang,
      input: userInput
    }).then((res) => {
      console.log(res.data.output);
      setUserOutput(res.data.output);
      setLoading(false);
    }).then(() => {
       
    })
  }


  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="App">

      < Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />

      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="cpp"
            defaultValue="  /* write your code here */ "
            onChange={(value) => { setUserCode(value) }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea id="code-inp" onChange=
              {(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }}
                className="clear-btn">
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;