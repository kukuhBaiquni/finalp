import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom';
import BahanPartials from './BahanPartials'

var thumbnailfoto = ''
var namaresep = 'Nama Resep'

export default class TulisResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      editjudul: false,
      namaresep: namaresep,
      open: false,
      nothing: false,
      foto: thumbnailfoto,
      files: []
    }
    this.pseudo1 = this.pseudo1.bind(this)
  }

  handleNamaResep(e){
    this.setState({
      namaresep: e.target.value
    })
  }

  namaResepSubmit(e){
    e.preventDefault()
    this.setState({
      editjudul: false
    })
    if (/^ *$/.test(this.state.namaresep)) {
      namaresep = 'Nama Resep'
      this.setState({
        namaresep: 'Nama Resep'
      })
    }else{
      namaresep = this.state.namaresep
    }
  }

  openJudul(){
    this.setState({
      editjudul: true
    })
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  dipilih(e){
    e.target.select()
  }

  uploadFoto2(files) {
    this.setState({
      files: files,
      foto: files[0]
    })
    if (thumbnailfoto.length > 0) {
      thumbnailfoto = []
    }
    thumbnailfoto = files[0]
  }

  hapusThumbnailFoto(){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      thumbnailfoto = ''
    }
  }

  pseudo1(){
    this.setState({
      namaresep: 'Nama Resep'
    })
    thumbnailfoto = ''
    namaresep = 'Nama Resep'
  }

  render(){

    var customize = {
      wordWrap: 'break-word',
      width: '700px',
      marginLeft: '50px',
      textAlign: 'center',
      fontSize: '40px',
      fontFamily: 'enigmaticregular',
      color: 'white',
    }
    const { open } = this.state;
    return(
      <div >

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
                thumbnailfoto.length !== 0 &&
                <img src={this.state.foto.preview} alt="preview" className='thumbnailpreview'/>
              }
          </div>
        </div>

        <div className='penjalin'>
          <form onSubmit={this.namaResepSubmit.bind(this)} className='resepformholder'>
            <div className="form-group">
              {
                this.state.editjudul
                ?
                <input autoFocus onFocus={this.dipilih.bind(this)} autoComplete='off' style={{textAlign: 'center'}} onChange={this.handleNamaResep.bind(this)} defaultValue={namaresep} type="text" id='formwidth1' className="form-control" />
                :
                <abbr title='Klik untuk mengubah nama resep'><div style={customize} onClick={this.openJudul.bind(this)}>{this.state.namaresep}</div></abbr>
            }
            </div>
          </form>

          <BahanPartials namaresep={namaresep} foto={thumbnailfoto} pseudo1={this.pseudo1}/>
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
          <div style={{display: 'none', height: '1px', width: '1px'}} onClick={this.pseudo1}></div>
        </div>
      </div>
    )
  }
}
