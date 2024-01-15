import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import styles from "./app.module.css";
import { db } from "./firebaseInit";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

// react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App(){
  const [formData, setformData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);

  const titleRef = useRef(null);
  const date = new Date();

  // useEffect(() => {
  //   if (blogs.length && blogs[0].title) {
  //     document.title = blogs[0].title;
  //   }
  //   else { document.title = "there is no Blog!!" }
  // });

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    // async function fetchData() {
    //   const snapShot = await getDocs(collection(db, "blogs"));
    //   console.log(snapShot);

    //   const blogs = snapShot.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });
    //   console.log(blogs);
    //   setBlogs(blogs);
    // }

    // fetchData();

    // get real time update

    const unSub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
          showToastMessage();

    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    titleRef.current.focus();

    const docRef = doc(collection(db, "blogs"));

    await setDoc(docRef, {
      title: formData.title,
      content: formData.content,
      createdOn: date.toDateString(),
    });
    toast.success("blog Added successfully.");


    setformData({ title: "", content: "" });
  }

  async function removeBlog(i) {
    // setBlogs(blogs.filter((blog, index) => index !== i));
    alert("Do you really want to Delete this blog");
    const docRef = doc(db, "blogs", i);
    await deleteDoc(docRef);
        toast.success("blog Deleted successfully.");

  }

  // react-toastify
  const showToastMessage = () => {
    toast.success(null, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.main}>
        <h1 className={styles.headings}>Write A Blog!</h1>
        <div className={styles.section}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <p className={styles.labelStyle}>Title</p>
            <input
              type="text"
              placeholder="Enter your title..."
              value={formData.title}
              ref={titleRef}
              onChange={(e) =>
                setformData({ ...formData, title: e.target.value })
              }
              required
            />
            <p className={styles.labelStyle}>Content</p>
            <input
              type="text"
              placeholder="Enter your content..."
              value={formData.content}
              onChange={(e) =>
                setformData({ ...formData, content: e.target.value })
              }
              required
            />
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </form>
        </div>
        <h2 className={styles.headings}>Blogs</h2>
        {blogs.map((item, index) => (
          <div className={styles.postStyle} key={index}>
            <h3 className={styles.headings}>{item.title}</h3>
            <p>{item.content}</p>
            <p className={styles.datePara}>
              Time: {item.createdOn.toLocaleString()}
            </p>
            <button
              className={`${styles.removeBtn} ${styles.btnDelete}`}
              onClick={() => removeBlog(item.id)}
            >
              <i className="material-icons">&#xe872;</i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

