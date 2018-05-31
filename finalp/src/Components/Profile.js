import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import {Redirect} from 'react-router'
import ProfileContent from './ProfileContent'

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadUser(token)
    }else{
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/' />
    }else{
      return(
        <div>
          <Navbar />
          <ProfileContent user={this.props.user} />
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
    user: state.user
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
)(Profile)
