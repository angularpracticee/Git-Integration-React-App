import { useContext } from "react";
import { Switch, Route, NavLink, Link } from "react-router-dom";

import logo from "./logo.svg";
import welcomegithub from "./assets/github.png";

import { gitCtx } from "./App";
import PrivateRoute from "./commons/PrivateRoute";
import GitRepoList from "./postLogin/GitRepoList";
import GitLogin from "./LoginComp/GitLogin";
import GitGistList from "./postLogin/GitGistList";
import NotFoundComp from "./commons/PageNotFoundComp";
function NavigationComp() {
  const [state, dispatcher] = useContext(gitCtx);
  function logout() {
    dispatcher({ type: "logout" });
  }

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
        </a>
        <nav>
          <div style={{ listStyle: "none" }}>
            <span>
              <NavLink className="Navlink" exact to="/">
                Home
              </NavLink>
            </span>
            <span>
              <NavLink className="Navlink" to="/repo">
                Repository
              </NavLink>
            </span>
            <span>
              <NavLink className="Navlink" to="/gist">
                Gists
              </NavLink>
            </span>
            {state.isLoggedIn ? (
              <span>
                <Link className="Navlink" to="/" onClick={logout}>
                  Logout
                </Link>
              </span>
            ) : null}
          </div>
        </nav>
      </header>
      <Switch>
        <PrivateRoute path="/repo" isLoggedIn={state.isLoggedIn}>
          <GitRepoList />
        </PrivateRoute>
        <PrivateRoute path="/gist" isLoggedIn={state.isLoggedIn}>
          <GitGistList />
        </PrivateRoute>
        <Route path="/">
          {state.isLoggedIn ? (
            <>
              <label className="onSuccessLogin">{state.onSuccess_msg}</label>
              <img src={welcomegithub} alt="Welcome To Github" />
            </>
          ) : (
            <GitLogin />
          )}
        </Route>
        <Route path="*" exact={true} component={NotFoundComp} />
      </Switch>
    </>
  );
}

export default NavigationComp;
