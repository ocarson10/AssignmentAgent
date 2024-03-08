import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './static/login';
import Tracker from './static/Tracker';
import ClassList from './static/ClassList';
// import { useEffect, useState } from 'react';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false)
  // const [username, setUsername] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/classlist" element={<ClassList/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
