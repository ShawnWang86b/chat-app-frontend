import "./App.css";
import { Route, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
      <Redirect from="*" to="/" />
    </div>
  );
}

export default App;
