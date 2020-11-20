import React, { createContext, useEffect, memo } from "react";
import { useImmerReducer } from "use-immer";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
// import axios from "axios";
// import { endPoints } from "utils/api";
import routes from "./routes";
import { Reducer } from "utils/reducer";

export const Context = createContext();

function App() {
  /**
   * Setting up state object (initialState) for context, So that can be accessed from any child component.
   */
  const initialState = {
    users: [],
    repos: [],
    followers: [],
    searched_user: "",
    alert: {
      show: false,
      type: "",
      description: "",
    },
    loader: false,
  };

  /**
   * UseImmerReducer will create the curried Reducer.
   * There is no need for creating immutable objects of nested object when using immerReducer (alternative of useReducer hook).
   */

  const [state, dispatch] = useImmerReducer(Reducer, initialState);

  /** For getting data of all the users and storing into context */

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data: users } = await axios.get(endPoints.user.base);
  //       dispatch({ type: "users", payload: { users } });
  //     } catch (err) {}
  //   })();
  // }, []);

  return (
    <section className="container">
      <Context.Provider value={{ state, dispatch }}>
        <Router>{renderRoutes(routes)}</Router>
      </Context.Provider>
    </section>
  );
}

export default memo(App);
