import React, {Component} from 'react'

export default class TableProfile extends Component {
  render(){
    return(
      <ul className="nav nav-tabs nav-justified">
      <li role="presentation" className="active"><a>Resep Saya</a></li>
      <li role="presentation"><a >Pencapaian</a></li>
      <li role="presentation"><a >Trofi</a></li>
      </ul>
    )
  }
}
