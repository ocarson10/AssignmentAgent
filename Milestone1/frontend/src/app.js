import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tracker from './static/Tracker';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
