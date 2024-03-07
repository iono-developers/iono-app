import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './utils/PrivateRoute';
import EventDetails from './components/Event/EventDetails';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import UserProfile from './components/Users/User';
import BottomNav from './components/Nav/BottomNav';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>

            <Route path="/login">
              <Login />
            </Route>

            <EventProvider>
              <PrivateRoute>
                <Route exact path='/events/'>
                  <EventList />
                </Route>
                <Route exact path='/'>
                  <EventList />
                </Route>
                <Route exact path='/user/:usernameLink/'>
                  <UserProfile />
                </Route>
                <Route exact path='/create/'>
                  <EventForm />
                </Route>
                <Route exact path='/events/:eventId/'>
                  <EventDetails />
                </Route>
                <BottomNav />
              </PrivateRoute>
            </EventProvider>

          </Switch>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
