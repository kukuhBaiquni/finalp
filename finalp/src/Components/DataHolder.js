import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'

class DataHolder extends Component {
  componentDidMount(){
    this.props.actions.loadResep()
  }
  render(){
    console.log('ddd',this.props);
    return(
      <div>
        <p>SX</p>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataHolder)
