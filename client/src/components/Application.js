import { useState, useEffect } from "react";
import "./Application.css";
import Navbar from "./navbar";
import useApplicationData from "../hooks/useApplicationData";
import CardList from "./CardList";

import UserPage from "./Views/UserPage";
import Button from "./Button";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Application(props) {
  ////**************** Progress tracker  *************************
  const testData = [
    { day: "Monday", bgcolor: "#6a1b9a", completed: 60 },
    { day: "Tuesday", bgcolor: "#6a1b9a", completed: 60 },
    { day: "Wednesday", bgcolor: "#6a1b9a", completed: 60 },
    { day: "Thursday", bgcolor: "#6a1b9a", completed: 60 },
    { day: "Friday", bgcolor: "#6a1b9a", completed: 60 },
    { day: "Saturday", bgcolor: "#6a1b9a", completed: 60 },
  ];

  const [completed, setCompleted] = useState(0);

  useEffect(() => {}, []);

  const [progresses, setProgresses] = useState(testData.map((item) => 0));

  function handleCountChange(count, idx) {
    let newProgresses = [...progresses];
    newProgresses[idx] = (count / 6) * 100;
    setProgresses(newProgresses);
  }

  ////*****************************************************

  const {
    user,
    setUser,
    state,
    addPlan,
    handleLogin,
    handleLogout,
    loginStatus,
  } = useApplicationData();
  useEffect(() => {
    console.log("isLoggedIn changed?", state.isLoggedIn);
    console.log("current_user", user);
  }, [state.isLoggedIn]);

  console.log("testing exercises", state.plans);
  console.log("isloggedIN", state.isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar logout={handleLogout} loggedOut={state.isLoggedIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <h1>
                  Welcome to Over9000. Work out plans designed to make as strong
                  as your Hero Each plan consists of 6 excercises. You'll do one
                  excerxise as many times as possible each day plus on rest day.
                  Now choose your challenge:
                </h1>
                <CardList
                  plans={state.plans}
                  exercises={state.exercises}
                  user={user}
                  setUser={setUser}
                />
              </div>
            }
          />

          <Route
            exact
            path="/login"
            element={
              <Login user={user} setUser={setUser} login={handleLogin} />
            }
          />

          <Route
            path="/signup"
            element={
              <SignUp user={user} setUser={setUser} login={handleLogin} />
            }
          />
          <Route
            path="/user"
            element={
              state.isLoggedIn ? (
                <div>
                  <UserPage
                    plan={state.plans[user.plan_id - 1]}
                    user={user}
                    exercises={state.exercises}
                  />
                </div>
              ) : (
                <div>Loading</div>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
