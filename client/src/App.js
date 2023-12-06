import { HomeScreen } from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import CreatePostScreen from "./screens/CreatePostScreen";
import PostScreen from "./screens/PostScreen";
import SignupScreen from "./screens/Signup";


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/createPost" element={<CreatePostScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/post/:id" element={<PostScreen />} />
      </Routes>
    </>
  );
}

export default App;
