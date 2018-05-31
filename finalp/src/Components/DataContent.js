import React, {Component} from 'react'
import ActualContent from './ActualContent'

export default class DataContent extends Component {

  render(){
    return(
      <div className='dudukan'>
        {
          this.props.data.map(function(x){
            return(
              <ActualContent key={x.resepid} data={x} />
            )
          })
        }
      </div>
    )
  }
}
