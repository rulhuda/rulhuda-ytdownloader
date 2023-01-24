import { Route, Routes } from "react-router";
// import "./App.css";
import YtMusic from "./features/yt-mp3/YtMusic";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<YtMusic />} />
      </Routes>
    </>
  );
}

export default App;
