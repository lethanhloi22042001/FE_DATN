import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";


import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

const renderApp = () => {
    ReactDOM.render(
        // Khởi động React - lưu trữ reduxStore vào biến store
        <Provider store={reduxStore}>
            <IntlProviderWrapper>    
                <App persistor={persistor}/>
            </IntlProviderWrapper>
        </Provider>,
        //Đã config redux
        // Đồng thời config chuyển đổi ngôn ngữ khi chúng ta đã khởi động App của chúng ta lên
        // 
        document.getElementById('root')
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
