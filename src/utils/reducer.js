/**
 * @param  {} draft => will store the copy of the state.
 * @param  {} action => will be the action to be dispatched.
 *
 * Benefit of using immer:
 *  1. We can mutate draft object and immer under the hood will create an immutable object based on copy-on-write mechanism
 *  2. Because of this we need not worry about our state being mutated.
 *  3. immer should be used if we have deeply nested object.
 */

export const Reducer = (draft, action) => {
  const { payload = {}, type } = action || {};
  switch (type) {
    case "users":
      draft.users = payload.users;
      return;
    case "searched_user":
      draft.searched_user = payload.value;
      return;
    case "alert":
      draft.alert.show = payload.show;
      draft.alert.type = payload.type || "";
      draft.alert.description = payload.description || "";
      return;
    case "loader":
      draft.loader = payload.value;
      return;
    case "followers":
      draft.followers = payload.value;
      draft.loader = false;
      return;
    case "repos":
      draft.repos = payload.value;
      draft.loader = false;
      return;
    case "update_repos":
      draft.repos = payload.repos;
      draft.followers = payload.followers;
      draft.searched_user = payload.searched_user;
      draft.loader = false;
    default:
      return;
  }
};
