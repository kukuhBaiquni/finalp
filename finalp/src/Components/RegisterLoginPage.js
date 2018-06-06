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

  componentDidMount(){
    let token = localStorage.getItem('token')
    this.props.actions.loadAllUser()
    if (token) {
      this.setState({
        redirect: true
      })
    }else{
      this.setState({
        redirect: false
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
      return <Redirect to='/' />
    }else{
      return(
        <div className='bg'>
          <Navbar />
          <button className='togglerreg' onClick={this.onClick}><span className='glyphicon glyphicon-refresh'></span></button>
          {
            this.state.toggler
            ? <RegisterForm actions={this.props.actions} user={this.props.user}/>
            : <LoginForm actions={this.props.actions} user={this.props.user}/>
          }
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
)(RegisterLoginPage)
