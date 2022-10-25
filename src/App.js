import Posts from "./Components/Posts";
import { Provider } from "react-redux";
import store from "./Redux/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Posts />
      </Provider>
    </div>
  );
}

export default App;
