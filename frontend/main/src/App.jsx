import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './utils/PrivateRoute';
import EventDetails from './components/Event/EventDetails';
import EventList from './pages/EventList';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <EventProvider>
            <Routes>

              <Route path="/login" element={<Login />} />

              <Route exact path='/' element={<PrivateRoute />}>1
                <Route exact path='' element={<EventList />} />
                <Route exact path='/events/:eventId' element={<EventDetails />} />
              </Route>

            </Routes>
          </EventProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
