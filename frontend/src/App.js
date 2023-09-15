
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Chat } from './components/Chat';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
    </div>
  );
}

export default App;
