import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom';
import LangkahPartials from './LangkahPartials'

import BahanPartials from './BahanPartials'


var thumbnailfoto = []

export default class TulisResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      namaresep: '',
      bahan: '',
      detail: '',
      open: false,
      files: []
    }
  }

  handleNamaResep(e){
    this.setState({
      namaresep: e.target.value
    })
  }

  handleBahan(e){
    this.setState({
      bahan: e.target.value
    })
  }

  handleDetail(e){
    this.setState({
      detail: e.target.value
    })
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };



  uploadFoto2(files) {
    this.setState({
      files: files
    })
    if (thumbnailfoto.length > 0) {
      thumbnailfoto = []
    }
    thumbnailfoto.push(files[0])
  }

  hapusThumbnailFoto(){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      thumbnailfoto = []
    }
  }



  render(){
    const { open } = this.state;
    return(
      <div>
        <div className='thumbfoto'>
          <section className='rectangle'>
            <Dropzone className='dropzone' onDrop={this.uploadFoto2.bind(this)} accept="image/*" multiple={ false }>
              {
                thumbnailfoto.length === 0 &&
                <div>
                  <span id='camera' className='glyphicon glyphicon-camera'></span>
                  <p className='klikupload'>Klik untuk upload foto</p>
                  <i className='advice'>"untuk hasil terbaik gunakan foto dengan posisi landscape"</i>
                </div>
              }
              {
                thumbnailfoto.length !== 0 &&
                <abbr className='Ganti foto'><div className='gantifoto'>Ganti foto <span className='glyphicon glyphicon-camera'></span></div></abbr>
              }
            </Dropzone>
            {
              thumbnailfoto.length !== 0 &&
              <div className='buangfoto' onClick={this.hapusThumbnailFoto.bind(this)}>Hapus <span className='glyphicon glyphicon-trash'></span></div>
            }
          </section>
          <div className='imgpos'>
            {
              thumbnailfoto.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='thumbnailpreview'/>)
            }
          </div>
        </div>

        <div className='penjalin'>
          <form onSubmit={this.resepSubmit} className='resepformholder'>
            <div className="form-group">
              <p className='labelg'>Nama Resep</p>
              <input autoComplete='off' onChange={this.handleNamaResep.bind(this)} value={this.state.namaresep} type="text" id='formwidth1' className="form-control" formwidthplaceholder="Nama Resep" />
            </div>
          </form>
          <div className='bahanwrapper'>
          <BahanPartials />
          </div>
          <div className='langkahwrapper'>
            <LangkahPartials />
          </div>


        </div>
        <Navbar />
        <div className="example">
          <Modal
            open={open}
            onClose={this.onCloseModal}
            center
            classNames={{
              transitionEnter: 'transition-enter',
              transitionEnterActive: 'transition-enter-active',
              transitionExit: 'transition-exit-active',
              transitionExitActive: 'transition-exit-active',
            }}
            animationDuration={250}
            >
            <div className='modalholder'>
              <p>Resep anda berhasil dibagikan!</p>
              <Link to='/'><button>Lihat Resep</button></Link>
              <hr/>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}
