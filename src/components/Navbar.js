import React, { useState } from 'react'
import '../App.css';
import pankaj from '../assets/pankaj.svg';

const Navbar = (props) => {

    const codes = new Map();
    codes['cpp'] = '#include<bits/stdc++.h>\nusing namespace std;\n\nint main(){ \n cout<<"Hello world;\n return 0;\n}'
    codes['py'] = 'print("Hello world!!")\n';
    codes['java'] = 'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\nclass HelloWorld {\n public static void main(String[] args) {\n  System.out.println("Hello, World!");\n  }\n}'

    const [toggle, setToggle] = useState(true);
    const [count, setCount] = useState(0);
    const [language, setLanguage] = useState("cpp")


    function newMode() {
        setToggle(!toggle);
        const value = toggle ? "vs-light" : "vs-dark";
        props.setUserTheme(value);
    }

    function chooseLanguage() {
        setCount((count + 1) % 3);
        if (count === 0) {
            props.setUserLang("cpp")
            props.setUserCode(codes['cpp']);
            setLanguage("cpp");
        }
        else if (count === 1) {
            props.setUserLang("py")
            props.setUserCode(codes['py']);
            setLanguage("Python");
        } else {
            props.setUserLang("java")
            props.setUserCode(codes['java']);
            setLanguage("Java");
        }
    }

    return (
        <nav>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <a class="navbar-brand" href="#Navbar"
                    >
                        <img
                            id="code-logo"
                            src={pankaj}
                            height="30"
                            width = "200"
                            alt = "good"
                        />
                        </a>
                    <button 
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav ms-auto align-items-center">
                            <li className="nav-item ms-3" onClick={() => chooseLanguage() }>
                                <button class="btn btn-black btn-rounded text-success"> Language : {language} </button>
                            </li>
                            <li className="nav-item ms-3">
                            <input type="range" min="15" max="40" value={props.fontSize} step="0.2" onChange={(e) => { props.setFontSize(e.target.value) }} />
                            </li>
                            <li className="nav-item ms-3" onClick={() => newMode() }>
                                {toggle ? <button class="btn btn-black btn-rounded text-danger"> 👌 Light </button> : <button class="btn btn-black btn-rounded text-success">👍 Dark</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    )
}
export default Navbar;
