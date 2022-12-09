import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { fetchUser } from './redux/featuer/userSlice';
const container = document.getElementById('root');
const root = createRoot(container);
store.dispatch(fetchUser());
root.render(
  <Provider store={store} >
    <App />
  </Provider>
);
