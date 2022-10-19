import './App.css';
import OpenAI from './pages/OpenAI';
import "antd/dist/antd.css";
import { Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import QandA from './pages/QandA';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path={"/"}><OpenAI/></Route>
        <Route exact path={"/openai"}><OpenAI/></Route>
        <Route exact path={"/qanda"}><QandA/></Route>
      </Switch>
    </Provider>
  );
}

export default App;
