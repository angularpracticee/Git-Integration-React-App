import { useContext, useEffect, useState } from "react";
import { getGitRepos } from "../Ajax/GitApis";
import {gitCtx} from '../App'

function GitRepoList() {
  const [state]=useContext(gitCtx)
  const [repoList, setRepoList] = useState([]);
  useEffect(() => {
    getGitRepos().then(
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
                <td>{rep.branch}</td>
                <td>{rep.forks}</td>
                <td><a href={rep.link}>Link</a></td>
                <td>{new Date(rep.created).toLocaleString()}</td>
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
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Forks</th>
            <th>Link</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>{repoData()}</tbody>
      </table>
    </div>
  );
}

export default GitRepoList;
