import React, {Component} from 'react'

export default class TableProfile extends Component {
  render(){
    return(
      <ul className="nav nav-tabs nav-justified">
      <li role="presentation" className="active"><a >Home</a></li>
      <li role="presentation"><a >Profile</a></li>
      <li role="presentation"><a >Messages</a></li>
      </ul>
    )
  }
}
