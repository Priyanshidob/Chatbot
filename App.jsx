import { useState } from "react";
import './App.css';
const App = () => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);


  const surpriseOption = [
    'What is pizza?',
    'What is Machine Learing?',
    'Where does pizza come from?',
    'Can you play chess?'
  ]

  const surprise = () => {
    const randomValue = surpriseOption[Math.floor(Math.random() * surpriseOption.length)]
    setValue(randomValue)
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }
  const getResponse = async () => {
    if (!value) {
      setError("Error!please ask question!")
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const response = await fetch('http://localhost:8000/chatbot1/backend', options)
      const data = await response.text()
      console.log(data)
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: value
      },
      {
        role: "model",
        parts: data
      }
      ])
      setValue("")

    } catch (error) {
      console.error(error)
      setError("Somthing whent wrong! Please try again later.")
    }
  }
  return (
    <>
      <title>ChatBot</title>
      <h1>Chat Bot</h1>
      <div className="app">

        <p>What do you want to know?
          <button className="surprise"
            onClick={surprise}
            disabled={!chatHistory}>
            Surprise-me</button>
        </p>
        <div className="input-container">
          <input value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="You can Ask any thing......" />

          {!error && <button id="ask" onClick={getResponse}>Ask</button>}
          {error && <button id="clear" onClick={clear}>clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          {chatHistory.map((chatItem, _index) => <div key={_index}>
            <p className="answer">{chatItem.role}:{chatItem.parts}</p>
          </div>)}
        </div>
      </div>
    </>
  )
}

export default App
