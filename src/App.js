import React, { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import spinner from './assets/loading.gif';

function App() {

  var codes = new Map();
  codes['cpp'] = '#include<bits/stdc++.h>\nusing namespace std;\n\nint main(){ \n cout<<"Hello world";\n return 0;\n}'

  const [userCode, setUserCode] = useState(codes['cpp']);
  const [userLang, setUserLang] = useState("cpp");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("write your input here");
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
    Axios.post(`https://codecompiler.onrender.com/compile`, {
      code: userCode,
      language: userLang,
      input: userInput
    }).then((res) => {
      console.log(res.data.output);
      setUserOutput(res.data.output);
      setLoading(false);
    }).catch((error) => {
      console.log(JSON.stringify(error.message));
      setLoading(false);
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
        userCode={userCode} setUserCode={setUserCode}
      />

      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            value={userCode}
            onChange={(value) => { setUserCode(value) }}
            //onKeyDown={(value) => { console.log(value.keyCode) }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea value={userInput} id="code-inp" onChange=
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