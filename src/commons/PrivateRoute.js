import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(loc) => {
        return rest.isLoggedIn === true ? (
          children
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
