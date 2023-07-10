import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCart from "../component/BlogCart"

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  useEffect(() => {
    getAllBlogs();
  }, []);
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.blog);
        // console.log(data.blog)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCart
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user}
            title={blog?.title}
            description={blog?.descripation}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;