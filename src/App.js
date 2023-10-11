// import logo from './logo.svg';
//import './App.css';
import Test from "./Public/Test";
import Loginsession from "./Authentication/Loginsession/Loginsession";
import Cartcount from "./Public/Cart/Cartcount";
import { Provider } from "react-redux";
import store from "./mainStore";
function App() {
  return (
    <>
      <Provider store={store}>
        <Test />
      </Provider>
    </>
  );
}

export default App;
