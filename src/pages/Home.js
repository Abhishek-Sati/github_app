import React, { useContext, memo, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Context } from "App";
import { endPoints } from "utils/api";
import Alert from "components/common/Alert";
import RepoCard from "components/home/RepoCard";

export default memo(function Home() {
  const inputRef = useRef();
  const history = useHistory();
  const { state: { searched_user, repos = [], loader, followers } = {}, dispatch } = useContext(
    Context
  );
  const followers_url = repos?.[0]?.owner?.followers_url;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    try {
      dispatch({ type: "loader", payload: { value: true } });
      const { data: value } = await axios.get(`${endPoints.user.base}/${searched_user}/repos`);
      dispatch({ type: "repos", payload: { value } });
    } catch (err) {
      dispatch({ type: "repos", payload: { value: [] } });
      dispatch({ type: "loader", payload: { value: false } });
      dispatch({
        type: "alert",
        payload: {
          show: true,
          type: "error",
          description: "No user present with this name",
        },
      });
    }
  };

  const handleShowFollowers = async () => {
    try {
      if (followers.length) return history.push(`/${repos[0].owner.id}/followers`);
      dispatch({ type: "loader", payload: { value: true } });
      const { data: value } = await axios.get(followers_url);
      dispatch({ type: "followers", payload: { value } });
      history.push(`/${repos[0].owner.id}/followers`);
    } catch (err) {
      dispatch({ type: "loader", payload: { value: false } });
      dispatch({
        type: "alert",
        payload: {
          show: true,
          type: "error",
          description: "Something went wrong",
        },
      });
    }
  };

  return (
    <section className="home_container">
      <h1 className="home_container__heading">GitHub App</h1>
      <section className="home_container__search_container">
        <input
          id="input"
          type="text"
          ref={inputRef}
          value={searched_user}
          placeholder="Search.."
          name="search"
          onChange={(e) =>
            dispatch({ type: "searched_user", payload: { value: e?.target?.value } })
          }
        />
        <button type="submit" className="primary-btn" onClick={() => handleSubmit()}>
          Submit
        </button>
      </section>
      <Alert />
      {followers_url ? (
        <button
          className="secondary-btn home_container__follower_btn"
          onClick={handleShowFollowers}
        >
          Show Followers
        </button>
      ) : null}
      <section className="home_container__repos_container">
        {loader ? (
          <div className="spinner absolute-l50-t50" />
        ) : repos.length ? (
          repos.map((item, index) => <RepoCard key={index} data={item} />)
        ) : (
          <h3 className="absolute-l40-t50 not-found-h3"> No Repositories To Show</h3>
        )}
      </section>
    </section>
  );
});
