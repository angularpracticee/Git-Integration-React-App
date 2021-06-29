import { useContext, useEffect, useState } from "react";
import { getGitGists } from "../Ajax/GitApis";
import {gitCtx} from '../App'
import '../App.css'
function GitGistList() {
  const [state]=useContext(gitCtx)
  const [repoList, setRepoList] = useState([]);
  useEffect(() => {
    getGitGists().then(
      (res) => {
        setRepoList(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const repoData = () => {
    if (repoList && repoList.length > 0) {
      const temp = repoList.map((rep) => {
        return (
            <tr key={rep.name}>
                <td>
                    <img src={rep.image} alt='User Avatar'
                    style={{maxWidth:'50px', maxHeight:'50px'}}/>
                </td>
                <td>{rep.name}</td>
                <td>{rep.language}</td>
                <td><a href={rep.link}>Link</a></td>
                <td>{new Date(rep.updated).toLocaleString()}</td>
          </tr>
        );
      });
      return temp;
    }
    return null;
  };

  return (
    <div>
      <label className="onSuccessLogin">{state.onSuccess_msg}</label>
      <table style={{width:'100%'}}>
        <thead>
          <tr key="tablehead">
            <th>Image</th>
            <th>Files</th>
            <th>Language</th>
            <th>Link</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>{repoData()}</tbody>
      </table>
    </div>
  );
}

export default GitGistList;
