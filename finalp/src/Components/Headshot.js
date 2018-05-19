import React, {Component} from 'react'

export default class Headshot extends Component {
  render(){
    return(
      <div className=''>
      <div className="row">
      <div className="col-sm-5 col-md-4">
      <div className="thumbnail">
      <img src="https://s3-ap-southeast-1.amazonaws.com/zerg.malesbanget.com/mbdcGallery/1474256034-tuyul-tuyuldisinetrontuyuldanmbakyul/97dd8fb7ad824a2e0982f2d7c40cadcf.jpg" alt="pam2"/>
      <div className="caption">
      <h3>Thumbnail label</h3>
      <p>...</p>
      <p></p>
      <input type='file' accept='image/*' />
      <input type='submit' />
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}
