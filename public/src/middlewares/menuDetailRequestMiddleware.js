/**
 * Created by zhangpei on 16/8/16.
 */
import request from 'superagent';
import {ID_GETTER} from '../actions/index';
import {loadMenuDetail} from '../actions/index';


var menuDetailRequestMiddleware = () => next => action => {
  switch (action.type) {
  case  ID_GETTER:
    request
        .get(`/menus/${action.id}`)
        .end((err, res)=> {
          next(loadMenuDetail(res.body));
        });
    break;
  }
  next(action);
};

export default menuDetailRequestMiddleware;