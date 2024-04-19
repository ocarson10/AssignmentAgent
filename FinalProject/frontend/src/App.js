import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './static/login';
import Tracker from './static/Tracker';
import ClassList from './static/ClassList';
import Offline from './static/Offline';
import Calendar from './static/Calendar';
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
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/offline" element={<Offline/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
