import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './static/login';
import Tracker from './static/Tracker';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
