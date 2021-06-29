import axios from "axios";

export const gitGetAccessToken = (client_id, gitLoginCode) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/git/access_token", {
        client_id: client_id,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        code: gitLoginCode,
      })
      .then(
        (res) => {
          if (res.data.access_token) {
            localStorage.setItem("access_token", res.data.access_token);
            resolve(res.data.access_token);
          } else {
            reject(new Error("Failed!!! token not received"));
          }
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
  });
};

export const getGitRepos = async () => {
  const res = await axios.get(
    `https://api.github.com/users/angularpracticee/repos`
  );
  return res.data.map((ele) => {
    return {
      key: ele.id,
      image: ele.owner.avatar_url,
      name: ele.name,
      created: ele.created_at,
      branch: ele.default_branch,
      forks: ele.forks,
      link: ele.html_url,
    };
  });
};

export const getGitGists = async () => {
  const res = await axios.get(
    `https://api.github.com/users/angularpracticee/gists`
  );
  return res.data.map((ele) => {
    let filename = "";
    let language = "";
    for (var key in ele.files) {
      filename = key;
      language = ele.files[key].language;
      break;
    }
    return {
      key: ele.id,
      image: ele.owner.avatar_url,
      name: filename,
      language: language,
      link: ele.html_url,
      updated: ele.updated_at,
    };
  });
};
