
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import App from './components/App';
import resultList from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import menuRequestMiddleware from './middlewares/menuRequestMiddleware';
import menuDetailRequestMiddleware from './middlewares/menuDetailRequestMiddleware';
import MenuDetailPackage  from './components/MenuDetailApp';
import {Router, Route, browserHistory,IndexRoute,Redirect} from 'react-router';
import MenuUpLoadAppPackage from './components/MenuUpLoadApp';
import uploadRequestMiddleware from './middlewares/upLoadRequestMiddleware';
import HomePageApp from './components/HomePageApp';
import LoginPackage from './components/Login';
import UserCenterAppPackage from'./components/UserCenterApp';
import sendMessageRequestMiddleware from './middlewares/sendMessageRequestMiddleware';
import AppRoot from './components/AppRoot';
import Register from './components/Register';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import checkUserRequestMiddleware from './middlewares/checkUserRequestMiddleware';
import Background from './components/Background';
import getUserMessageMiddleware from './middlewares/getUserMessageMiddleware';
import userWorksRequestMiddleware from './middlewares/userWorksRequestMiddleware';
import HomePageList from './container/HomePageList';
import homePageMiddleware from './middlewares/homePageMiddleware';

const store = createStore(
    resultList,
    applyMiddleware(thunkMiddleware,createLogger(),menuRequestMiddleware,menuDetailRequestMiddleware,uploadRequestMiddleware,sendMessageRequestMiddleware,checkUserRequestMiddleware,getUserMessageMiddleware,userWorksRequestMiddleware,homePageMiddleware)
);

store.dispatch({//一开始就要一个action去触发页面
  type: 'INIT'
});


render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={AppRoot}>
          <IndexRoute component={HomePageList} />
          <Route path="in" component={Background}>
            <Route path="login" component={LoginPackage}/>
            <Route path="register" component={Register}/>
          </Route>
          <Route path="menu" component={App}/>
          <Route path='menuDetail/:id' component={MenuDetailPackage}/>
          <Route path='menuUpLoad' component={MenuUpLoadAppPackage}/>
          <Route path="userCenter" component={UserCenterAppPackage}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);