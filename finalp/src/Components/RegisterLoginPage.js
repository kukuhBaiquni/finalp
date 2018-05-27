import React, {Component} from 'react'
import RegisterForm from './RegisterForm'
import Navbar from './Navbar'
import LoginForm from './LoginForm'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import {Redirect} from 'react-router'

class RegisterLoginPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggler: true,
      redirect: false
    }
    this.onClick = this.onClick.bind(this)
  }

  componentWillMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        redirect: true
      })
    }
  }

  onClick(){
    this.setState(function(prevState){
      return {toggler: !prevState.toggler}
    })
  }
  render(){
    if (this.state.redirect) {
      return <Redirect to='/profile' />
    }else{
      return(
        <div className='bg'>
          <Navbar />
          <button className='togglerreg' onClick={this.onClick}><span className='glyphicon glyphicon-refresh'></span></button>
          {
            this.state.toggler
            ? <RegisterForm addUser={this.props.actions.addUser}/>
          : <LoginForm loginAttempt={this.props.actions.loginAttempt}/>
          }
        </div>
      )
    }
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
)(RegisterLoginPage)
