import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import LangkahFotoDropper from './LangkahFotoDropper'

var images = [];
export default class LangkahFoto extends Component {
  constructor(props){
    super(props)
    this.state = {
      files : []
    }
  }
  uploadFoto(files) {
    this.setState({
      files: files
    })
    if (images.length > 0) {
      images[0]=files[0]
    }else{
      images.push(files[0])
    }
  }
  // <div className='imgpos'>
  //   {
  //   }
  // </div>

  render(){
    console.log('ooo',images);
    return(
      <section className='rectangle'>
        <Dropzone className='dropzone' onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
          <p className='poto'><span className='glyphicon glyphicon-camera'></span> Tambahkan foto</p>
          {
              images.map(function(data){
                return(
                  <LangkahFotoDropper key={data.preview} oper={images}/>
                )
              })
          }
        </Dropzone>
      </section>
    )
  }
}
