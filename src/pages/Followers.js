import React, { useContext, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "App";
import FollowerCard from "components/home/FollowerCard";

export default memo(function Followers() {
  const {
    state: { followers = [], loader },
  } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    if (!followers.length) history.push("/");
  }, []);
  return (
    <section style={{ gridColumn: "center-start/center-end", textAlign: "center" }}>
      <h1 className="detail_container__heading">Followers</h1>
      <section className="home_container__repos_container">
        {loader ? (
          <div className="spinner absolute-l50-t50" />
        ) : (
          followers.map((item, index) => <FollowerCard key={index} data={item} />)
        )}
      </section>
    </section>
  );
});
