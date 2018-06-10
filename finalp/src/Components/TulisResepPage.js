import React, {Component} from 'react'
import TulisResepForm from './TulisResepForm'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'

class TulisResepPage extends Component {
  render(){
    return(
      <div>
        <TulisResepForm utility={this.props.utility} actions={this.props.actions} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    utility: state.utility
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
)(TulisResepPage)
