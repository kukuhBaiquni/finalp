import React, {Component} from 'react'

export default class LangkahFotoDropper extends Component {
  render(){
    console.log(this.props.oper[0].preview);
    // this.props.oper.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='previewimg'/>)
    return(
      <div>
        {
          this.props.oper.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='previewimg'/>)
        }
      </div>
    )
  }
}
