import { Routes, Route } from "react-router-dom";
import AppContent from "../src/components/Auth/js/AppContent";
import HomePage from "./components/Home/components/home/js/HomePage";
import QuestionSetList from "./components/Home/components/Question/js/QuestionSetList";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/js/ProtectedRoute";
import Main from "./components/Home/components/home/js/main";
import UserPage from "./components/Home/components/Users/js/UserPage"
import SocialPage from "./components/Home/components/Socials/js/SocialPage"
import MessagePage from "./components/Home/components/Socials/message/js/MessagePage"
import NotificationPage from "./components/Home/components/Socials/Notification/js/notificationPage"
import IslandScene from "./components/Home/Timemories/js/IslandScene";
function App() {
  return (

    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route path="home" element={<Main/>} />
            <Route path="questions" element={<QuestionSetList />} />
            <Route path="users/:id" element={<UserPage />} />
            <Route path="socials" element={<SocialPage/>}/>
            <Route path="message" element={<MessagePage/>}/>
            <Route path="notification" element={<NotificationPage/>}/>
            <Route path="isLand" element={<IslandScene/>}/>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
