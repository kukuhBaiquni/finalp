import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

export default class FormFoto extends Component {
  constructor(props){
    super(props)

    this.state = {
      files: []
    }
  }
  uploadFoto(files) {
    this.setState({
      files: files
    })
    this.props.sendNudes(files)
  }

  render(){
    return(
      <section className='rectangle'>
        <Dropzone onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
          <p className='poto'>Tambahkan foto</p>
          <span className='glyphicon glyphicon-plus' id='plus'></span>
        </Dropzone>
        <p className='poto'>Preview</p>
        {
          this.state.files.map(f => <img key={f.name} src={ f.preview } alt="preview" className='previewimg'/>)
        }
      </section>
    )
  }
}
