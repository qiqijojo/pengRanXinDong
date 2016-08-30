/**
 * Created by zhangpei on 16/8/21.
 */
import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {sendMessage}  from '../actions/index';
import {resetRegister} from '../actions/index';
import {withRouter} from 'react-router';
import {connect}  from 'react-redux';
import {showRegisterErr} from '../actions/index';
import {sendRegisterMessage} from '../actions/index';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      errUserMessage:'',
      errPasswordMessage:'',
      errTelMessage:''
    }
  }

  click() {
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    var passwordAgain = this.refs.passwordAgain.value.trim();
    var tel = this.refs.tel.value.trim();
    var  flag = true;
    if(username.length < 6){
      this.setState({errUserMessage:'用户名长度不得小于6',
      });
      flag = false
    }
    if(password.length < 6 || passwordAgain<6 ){
      this.setState({errPasswordMessage:'密码长度不得小于6',
      });
      flag = false
    }
    if(password !== passwordAgain){
      this.setState({errPasswordMessage:'两次输入的密码不一致',
      });
      flag = false
    }
    if(tel.length === 0){
      this.setState({
        errTelMessage:'联系方式不能为空'
      })
    }
    if(flag){
      this.props.sendRegisterMessage({username:username,password:password,tel:tel})
    }
  }

  focusUserName(){
    this.refs.username.value = '';
    this.setState({errUserMessage:''})
    this.props.showRegisterErr('');
  }
  focusPassword(){
    this.setState({errPasswordMessage:''})
  }
  focusTel(){
    this.refs.tel.value = '';
    this.setState({errTelMessage:''});
  }
  componentWillUpdate(nextProps) {

    if(nextProps.registerToLogin) {
      this.props.router.push('/in/login');
      this.props.resetRegister();
    }
  }

  render() {
    return (
        <div >
          <div >
            <h1 className='text-center'> 烹然心动 </h1>
          </div>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" id="exampleInputEmail" placeholder="用户名" ref="username"
                     default=""  onFocus={this.focusUserName.bind(this)}/>
              <p className=" text-danger" >{this.state.errUserMessage}</p>
              <p className=" text-danger" >{this.props.registerErrShowed}</p>
            <br/><br/></div>
            <div className="form-group">
              <input type="password" className="form-control" id="exampleInputPassword" placeholder="密码" ref="password"
                     default=""  onFocus={this.focusPassword.bind(this)}/>
              <p className=" text-danger" >{this.state.errPasswordMessage}</p>
              <br/><br/></div>
            <div className="form-group">
              <input type="password" className="form-control" id="exampleInputPassword" placeholder="再次确认密码" ref="passwordAgain"
                     default=""  onFocus={this.focusPassword.bind(this)}/>
              <p className=" text-danger" >{this.state.errPasswordMessage}</p>
              <br/><br/> </div>
            <div className="form-group">
              <input type="text" className="form-control" id="exampleInputPassword" placeholder="联系方式" ref="tel"
                     default=""  onFocus={this.focusTel.bind(this)}/>
              <p className=" text-danger" >{this.state.errTelMessage}</p>
              <br/><br/></div>
            <button type="button" id='register-btn' className="btn btn-success" onClick={this.click.bind(this)}>注 册</button>
          </form>
        </div>
    );
  }
}


var mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch)=> ({
  sendRegisterMessage: (data)=> {
    dispatch(sendRegisterMessage(data));
  },
  showRegisterErr: (err)=> {
    dispatch(showRegisterErr(err));
  },
  resetRegister:()=>{
    dispatch(resetRegister());
  }
});
var LoginPackage = connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
export default LoginPackage;
