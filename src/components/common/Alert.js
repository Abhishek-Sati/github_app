import React, { memo, useContext } from "react";
import { Context } from "App";

export default memo(function Alert() {
  const {
    state: { alert },
    dispatch,
  } = useContext(Context);

  if (!alert.show) return null;

  return (
    <section className={`alert ${alert.type}`}>
      <span
        className="alert__close_btn"
        onClick={() => dispatch({ type: "alert", payload: { show: false } })}
      >
        &times;
      </span>
      <strong>{alert.type || "Success"}</strong> {alert.description || ""}
    </section>
  );
});
