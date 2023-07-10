import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Userblog from "./pages/Userblog";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div className="App">
    <Header/>
    <Toaster></Toaster>
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Blogs/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/my-blogs" element={<Userblog/>}/>
          <Route path="/Create-blogs" element={<CreateBlog/>}/>
          <Route path="/blog-details/:id" element={<BlogDetails/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
