import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './utils/PrivateRoute';
import EventDetails from './components/Event/EventDetails';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import Loading from './components/Utils/Loading';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <EventProvider>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>

              <PrivateRoute>
                <Route exact path=''>
                  <EventList />
                </Route>
                <Route exact path='/loading'>
                  <Loading />
                </Route>
                <Route exact path='/create'>
                  <EventForm />
                </Route>
                <Route exact path='/events/:eventId'>
                  <EventDetails />
                </Route>
              </PrivateRoute>
            </Switch>
          </EventProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
