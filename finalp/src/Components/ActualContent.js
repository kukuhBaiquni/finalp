import React, {Component} from 'react'

export default class ActualContent extends Component {
  render(){
    let path = 'http://localhost:3000/images'
    return(
      <div>
      <div className='dataholder'>
        <img className='imgholder' src={path + '/' + this.props.data.foto[0] +'.jpg'} alt={this.props.data.resepid} />
      </div>
      <div className='sekat'></div>
    </div>
    )
  }
}
