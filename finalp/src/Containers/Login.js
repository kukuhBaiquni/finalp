import React, {Component} from 'react'
import Multiform from './Multiform'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      login : true
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(){
    this.setState(function(prevState){
      return {login: !prevState.login}
    })
  }

  render(){
    if (this.state.login) {
      return(
        <div className='logform'>
        <button className='regb' onClick={this.onClick}>Login Form</button>
        <br/><br/><br/>
        <form>
        <div className="form-group">
        <label className='labelf'>Email</label>
        <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
        <label className='labelf'>Password</label>
        <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button className='dft'>Masuk</button>
        </form>
        </div>
      )
    }else{
      return <Multiform />
    }
  }
}
