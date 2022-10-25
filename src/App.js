import { useState, useRef } from "react";

import "./App.css";
import plLogo from "./pl.png";

function App() {
  const [result, setResult] = useState(null)
  const player1 = useRef("");
  const player2 = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      `http://127.0.0.1:8000/app/?player1=${player1.current.value}&player2=${player2.current.value}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((resp) => setResult(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={plLogo} alt="logo" />
        <div id="title">
          <h1>
            6 degrees of the <p id="pl">Premier League</p>
          </h1>
        </div>
        <p id="help">
          Choose two players to see how they connect through mutual teammates
        </p>
        <form onSubmit={submitHandler}>
          <div id="inputs">
            <input type="text" name="player1" ref={player1} />
            <input type="text" name="player2" ref={player2} />
          </div>
          <div id="submitDiv">
            <input type="submit" value="Calculate" />
          </div>
        </form>
        {result && <p>{result}</p>}
      </header>
    </div>
  );
}

export default App;
