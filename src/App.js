import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 10,
  };

  setProgress = (progress) => {
    this.setState({ process: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="yellow" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key=""
                  pageSize={5}
                  country="in"
                  category="general"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={5}
                  country="in"
                  category="business"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={5}
                  country="in"
                  category="entertainment"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/eneral"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={5}
                  country="in"
                  category="general"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={5}
                  country="in"
                  category="health"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={5}
                  country="in"
                  category="sports"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={5}
                  country="in"
                  category="science"
                  apikey={this.apikey}
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={5}
                  country="in"
                  category="technology"
                  apikey={this.apikey}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
