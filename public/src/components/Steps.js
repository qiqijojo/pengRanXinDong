import React, {Component} from 'react';// eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
class Steps extends Component {
  constructor(props) {
    super(props);
  }

  rawMarkup(str) {

    if (str !== undefined) {
      var rawMarkup = marked((str).toString()); // eslint-disable-line no-undef
      return {__html: rawMarkup};
    }
  }

  render() {
    let {steps} = this.props;


    return (
        <div >
          <h3>做法与步骤</h3>
          <div dangerouslySetInnerHTML={this.rawMarkup(steps)}></div>
        </div>
    );
  }

}




var mapStateToProps = (state)=> {
  return {steps: state.menuItem.steps};
};
var StepsPackage = connect(mapStateToProps)(Steps);
export default StepsPackage;