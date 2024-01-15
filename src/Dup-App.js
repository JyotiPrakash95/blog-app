import React, { useRef, useState, useEffect, useReducer } from "react";
import "./index.css";
import { db } from "./firebaseInit";
import { collection, addDoc } from "firebase/firestore";

// useReducer Function
function blogReducer(blogState, action) {
  switch (action.type) {
    case "AddBlog":
      return [action.blog, ...blogState];
    case "Remove":
      return blogState.filter((blog, index) => index !== action.index);
    default:
      return [];
  }
}

const App = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  // const [blogs, setBlogs] = useState([]);
  const [blogs, dispatch] = useReducer(blogReducer, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "there is no Blog!!";
    }
  });

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  // const clickHandle = (e) => {
  //   e.preventDefault();
  //   setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
  //   setFormData({ title: "", content: "" });
  // };

  // useReducer

  const titleRef = useRef(null);

  function clickHandle(e) {
    e.preventDefault();
    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

    dispatch({
      type: "AddBlog",
      blog: { title: formData.title, content: formData.content },
    });

    titleRef.current.focus(); //we can use current to select the ref property
    console.log("title: " + formData.title, "Content: " + formData.content);
    setFormData({
      title: "",
      content: "",
    });
  }

  function removeClick(i) {
    alert("do you really want to remove this blog");
    dispatch({ type: "Remove", index: i });
  }
  return (
    <div style={main}>
      <h1>Write A Blog!</h1>
      <div style={section}>
        <form onSubmit={clickHandle} style={{ width: "100%" }}>
          <p style={labelStyle}>Title</p>
          <input
            type="text"
            placeholder="Enter your title..."
            value={formData.title}
            ref={titleRef}
            onChange={
              (e) => setFormData({ ...formData, title: e.target.value })
              // setFormData({
              //   title: e.target.value,
              //   content: formData.content,
              // })
            }
            required
          />
          <p style={labelStyle}>Content</p>
          <input
            type="text"
            placeholder="Enter your content..."
            value={formData.content}
            onChange={
              // (e) => setFormData({ ...formData, content: e.target.value })
              (e) =>
                setFormData({ title: formData.title, content: e.target.value })
            }
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <h2>Blogs</h2>
      {blogs.map((item, index) => (
        <div className="blogDiv" style={postStyle} key={index}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <button style={removeBtn} onClick={() => removeClick(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const main = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "70vh",
  gap: "20px",
  padding: "40px",
};

const section = {
  backgroundColor: "#1e988d",
  padding: "60px 40px",
  borderRadius: "20px",
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const postStyle = {
  backgroundColor: "lightgray",
  padding: "20px",
  width: "70%",
  borderRadius: "10px",
};

const labelStyle = {
  color: "#ffff",
  textTransform: "uppercase",
};
const removeBtn = {
  backgroundColor: "#fd5858",
  borderRadius: "3px",
  padding: "10px",
};

export default App;
