import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

//component imports
import Landing from "./Landing/Landing";
import Footer from "./Footer/Footer";

function App() {
  const [appState, updateAppState] = useState("landing");
  const [filename, updateFilename] = useState("");
  const [pageData, updatePageData] = useState({});
  useEffect(() => {
    if (appState === "submitted") {
      console.log(filename);
      const endpoint = "http://localhost:5000/getResumeDetails?filename=" + filename;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          updatePageData(data)
          updateAppState("results")
        });
      updateAppState("loading");
    }
  }, [appState]);
  let pageContent;
  if (appState == "landing") {
    pageContent = (
      <>
        <Landing
          updateAppState={updateAppState}
          updateFilename={updateFilename} />
        <Footer />
      </>
    );
  } else if (appState === "loading") {
    pageContent = <LoadingScreen />
  } else if (appState === "results") {
    pageContent = <>{JSON.stringify(pageData)}</>;
  } else {
    pageContent = <>.</>;
  }
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;900&display=swap" rel="stylesheet" />
      <BackgroundWave />
      <div className="page-content">
        {pageContent}
      </div>

    </>
  )
}

function BackgroundWave() {
  return (
    <div className="background-wave-container">
      <img src="./img/wave-vector.svg" className="background-wave" />
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen-container">
      <img src="./img/loading.gif" className="loading-gif" />
      <p className="loading-screen-text">Finding you a FAANG offer...</p>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);