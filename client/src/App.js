import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Button, Icon, Image, Modal, Form } from "semantic-ui-react";
import axois from 'axios';

function App() {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    logout,
    isLoading,
    error,
  } = useAuth0();

  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [code, setCode] = useState(null);

  const getPosts = async () => {

    const { data } = await axois({
      url: 'http://localhost:8888/.netlify/functions/getPosts',
    });

    console.log(data);
    setPosts(data);

  }

  const submitQuestion = async (e) => {
    e.preventDefault();

    const { data } = await axois({
      url: 'http://localhost:8888/.netlify/functions/addPost',
      body: {
        title,
        description,
        code,
        email: user.email
      }
    });

    getPosts();

  }

  useEffect(() => {

    getPosts();

    
    return () => {
      
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="ball"></div>
        <div className="left">
          <h1>Dev_it</h1>
          <p>Ask help from other Developers</p>
        </div>
        <div className="right">
          <h2>Login Here</h2>
          <button onClick={loginWithRedirect}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <main className="ui container">
        <div className="hero">
          <h4>Questions</h4>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<button className="ui primary button">Post a Question</button>}
          >
            <Modal.Header>Modal Header</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Title</label>
                  <input placeholder="Title" value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                  <Form.TextArea
                    label="Description"
                    placeholder="Tell us more about your question..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.TextArea
                    label="Code"
                    placeholder="Paste your code here. Optional"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Field>
                <Button type="submit" className="ui positive button" onClick={(e) => submitQuestion(e)}>
                  Submit Your Question
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>

        <div className="main">
          {
            (posts.length > 0) ? (
              posts.map(post => {
                return (
                  <div className="ui link card fluid" key={post._id}>
            <div className="content">
              <div className="header">{post.title}</div>
              <div className="meta">{post.email}</div>
              <div className="description">
                {post.description}
              </div>
              <div className="ui divider"></div>
              <div className="extra content">
                <a>
                  <i aria-hidden="true" className="calendar icon"></i>{post.createdDate}
                </a>
              </div>
            </div>
          </div>
                )
              })
            ) : (
              <h4>No Posts yet.</h4>
            )
          }
        </div>
      </main>
    </div>
  );
}

export default App;
