import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" exact>
          <ChatProvider>
            <ChatPage />
          </ChatProvider>
        </Route>

        <Route path="/reset-password" component={ResetPasswordPage} />
      </Switch>
    </div>
  );
}

export default App;
