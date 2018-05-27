import React, {Component} from 'react'

export default class Toggler extends Component {
  render(){
    return(
      <button className='togglerreg' onClick={this.onClick}><span className='glyphicon glyphicon-refresh'></span></button>
    )
  }
}
