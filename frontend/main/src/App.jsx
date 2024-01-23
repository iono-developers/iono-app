import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './components/Event/EventDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/login" element={<Login />} />

            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/events/:eventId' element={<EventDetails />} />
            </Route>

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
