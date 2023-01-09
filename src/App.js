import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={ChatPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;
