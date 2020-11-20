import React, { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "App";
import check from "images/check.jpeg";
import axios from "axios";

export default memo(function FollowerCard({ data = {} }) {
  const history = useHistory();
  const { dispatch } = useContext(Context);
  const { avatar_url, login, repos_url } = data;

  const handleSelect = async () => {
    if (!repos_url)
      dispatch({
        type: "alert",
        payload: {
          show: true,
          type: "error",
          description: "Repository url not available",
        },
      });
    try {
      dispatch({ type: "loader", payload: { value: true } });
      const { data: value } = await axios.get(repos_url);
      dispatch({ type: "repos", payload: { value } });
      dispatch({ type: "searched_user", payload: { value: login } });
      history.push("/");
    } catch (err) {
      dispatch({ type: "loader", payload: { value: false } });
      dispatch({
        type: "alert",
        payload: {
          show: true,
          type: "error",
          description: "Something went wrong !!",
        },
      });
    }
  };

  return (
    <section className="home_container__repo_card" onClick={handleSelect}>
      <img className="home_container__repo_card__img" src={avatar_url} alt={login ?? "N/A"} />
      <section className="home_container__repo_card__name_desc_wrapper">
        <h3 className="home_container__repo_card__name_desc_wrapper__name">{login ?? "N/A"}</h3>
        <img className="check_icon" src={check} />
      </section>
      <p className="home_container__repo_card__name_desc_wrapper__desc"> {repos_url ?? "N/A"}</p>
    </section>
  );
});
