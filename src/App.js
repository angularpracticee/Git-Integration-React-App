import "./App.css";
import { createContext, useReducer } from "react";
import { gitState, gitActions } from "./store/storeLogic";
import NavigationComp from "./navHeader";

export const gitCtx = createContext();
function App() { 
  //Reducer is not a must here, used it just to showcase.
  const [state, dispatcher] = useReducer(gitActions, gitState);
  return (
      <div className="App">
        <gitCtx.Provider value={[state, dispatcher]}>
          <NavigationComp />
        </gitCtx.Provider>
      </div>
  );
}

export default App;
