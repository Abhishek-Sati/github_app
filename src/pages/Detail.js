import React, { Fragment, memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import check from "images/check.jpeg";

export default memo(function Detail({ location: { state: { data } = {} } }) {
  const { name, description, owner = {} } = data || {};
  const history = useHistory();
  useEffect(() => {
    if (!data) history.push("/");
  }, []);
  const categories = ["Code review", "IDE's", "Free", "Paid"];
  return (
    <Fragment>
      <h1 className="detail_container__heading"> Repository Details </h1>
      <section className="detail_container">
        <section className="detail_container__lft_child">
          <img className="detail_container__lft_child__img" src={owner.avatar_url} />
          <section className="detail_container__lft_child__verify">
            <section className="flex_ai-c">
              <img src={check} className="check_icon" style={{ marginLeft: 0 }} />
              <strong className="detail_container__lft_child__verify__strong">
                Verified by github
              </strong>
            </section>
            Github confirms that this app meets the <a>requirements for verification.</a>
          </section>
          <section className="detail_container__lft_child__categories">
            <h5>Categories</h5>
            {categories.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </section>
        </section>
        <section className="detail_container__rgt_child">
          <p style={{ fontSize: "1.6rem", color: "gray", fontWeight: "500" }}>Application</p>
          <h2 className="detail_container__rgt_child__name">{name}</h2>
          <button className="detail_container__rgt_child__btn success-btn">Set up a plan</button>
          <strong className="detail_container__rgt_child__desc_1">{description}</strong>
          <p className="detail_container__rgt_child__desc_2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
        </section>
      </section>
    </Fragment>
  );
});
