import { useContext, useEffect } from "react";
import { gitCtx } from "../App";
import { useLocation } from "react-router";
import { gitGetAccessToken } from "../Ajax/GitApis";
import { useHistory } from "react-router-dom";
import styles from './GitLogin.module.css'

function GitLogin() {
  const redirect_uri = "http://localhost:3000/";
  const [gitState, dispatcher] = useContext(gitCtx);
  const location = useLocation();
  const historyObj = useHistory();
  const client_id = gitState.config.client_id;

  useEffect(() => {
    if (location.search.includes("?code=")) {
      let params = new URLSearchParams(location.search);
      let gitLoginCode = params.get("code");
      historyObj.replace("/");
      gitGetAccessToken(client_id, gitLoginCode).then(
        (newToken) => {
          if (newToken) {
            dispatcher({
              type: "login_successful",
              token: newToken,
            });
          } else {
            console.log("no token received");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [location, client_id, gitState, dispatcher, historyObj]);

  return (
    <>
      <a
        className="login-link"
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&scope=repo,gist&redirect_uri=${redirect_uri}`}
      >
        <button className={styles.btnstyle}>Sign in to GitHub</button>
      </a>
    </>
  );
}

export default GitLogin;
