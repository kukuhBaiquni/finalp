import React, {Component} from 'react'

export default class ProfileContent extends Component {


  render(){
    return(
      <div>
        <h1 className='tisting'>{this.props.user.userid}</h1>
      </div>
    )
  }
}
