import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route
          path="/chats"
          element={
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          }
        ></Route>
        <Route
          path="/reset-password/:id/:token"
          component={<ResetPasswordPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
