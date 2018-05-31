import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom';

var images = [];
var listbahan = []
var thumbnailfoto = []
var checker = 0
export default class TulisResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      namaresep: '',
      bahan: '',
      detail: '',
      open: false,
      adding: false,
      handler1: '-700px',
      handler2: '-725px',
      handler3: '-685px',
      tambahlangkah: false,
      editing: false,
      nothing: true,
      handleEditValue: '',
      files: []
    }
    this.editClick = this.editClick.bind(this)
    this.onDeleteBahan = this.onDeleteBahan.bind(this)
    this.resepSubmit = this.resepSubmit.bind(this)
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

  uploadFoto(files) {
    this.setState({
      files: files
    })
    images.push(files[0])
  }

  uploadFoto2(files) {
    this.setState({
      files: files
    })
    if (thumbnailfoto.length > 0) {
      thumbnailfoto = []
    }
    thumbnailfoto.push(files[0])
  }

  toggler(){
    this.setState({
      adding : true
    })
  }

  onCancel(e){
    if (e.keyCode === 27) {
      this.setState({
        adding: false
      })
    }
  }

  onCancelEdit(e){
    if (e.keyCode === 27) {
      this.setState({
        editing: false
      })
    }
  }

  bahanSubmit(e){
    e.preventDefault()
    this.setState({
      handler1 : parseInt(this.state.handler1, 10)-51+'px',
      handler2 : parseInt(this.state.handler2, 10)-51+'px',
      handler3 : parseInt(this.state.handler3, 10)-51+'px'
    })
    function cidug(x){
    return x.charAt(0).toUpperCase() + x.slice(1)
    }

    listbahan.push(cidug(this.input.value))
    this.input.value = ''
  }

  handleEditChange(e){
    this.setState({
      handleEditValue: e.target.value
    })
  }

  pseudoSubmit(e){
    if (e.keyCode === 13) {
      e.preventDefault()
      this.setState({
        editing: false
      })
    }
  }

  onDeleteBahan(i){
    listbahan.splice(i, 1)
    this.setState({
      handler1 : parseInt(this.state.handler1, 10)+51+'px',
      handler2 : parseInt(this.state.handler2, 10)+51+'px',
      handler3 : parseInt(this.state.handler3, 10)+51+'px'
    })
  }

  editClick(i){
    this.setState({
      editing: true,
      handleEditValue: listbahan[i]
    })
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

  resepSubmit(e){
    e.preventDefault()
    var namaresep = this.state.namaresep;
    var bahan = this.state.bahan;
    var detail = this.state.detail;
    var penulis = localStorage.getItem('token')
    if (namaresep && bahan && detail && penulis && images.length !== 0) {
      this.props.tambahResep(namaresep, bahan, detail, penulis, images)
      images = [];
      this.setState({
        namaresep: '',
        bahan: '',
        detail: '',
        open: true,
        files: []
      })
    }
  }

  render(){
    var styleTambahBahan = {
      cursor: 'pointer',
      padding:' 18px 3px',
      width: '400px',
      height: '60px',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'enigmaticregular',
      backgroundImage: 'linear-gradient(to right, #1b007c, #4d2e9b, #7757bb, #9f81db, #c7adfb)',
      lineHeight: '20px',
      fontSize: '20px',
      marginLeft: '560px',
      border: '1px solid white',
      borderRadius: '4px',
      marginTop: this.state.handler1
    }

    var styleListBahan = {
      width: '400px',
      marginTop: this.state.handler2,
      marginLeft: '560px',
      position: 'absolute'
    }

    var styleNote = {
      position: 'absolute',
      color: '#4d2e9b',
      fontSize: '13px',
      marginLeft: '565px',
      marginTop: this.state.handler3
    }

    const { open } = this.state;
    var list = listbahan.map((f,i) =>
    <div key={i}>
    <div>
    <div className='lili'>{listbahan[i]}</div>
    <abbr title='edit bahan'><div className='editbahan' onClick={()=> this.editClick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
    <abbr title='hapus bahan'><div className='deletebahan' onClick={()=> this.onDeleteBahan(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
    </div>
    </div>
    )

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
        <div className='penjalin'></div>

        <form onSubmit={this.resepSubmit} className='resepformholder'>
          <div className="form-group">
            <p className='labelf'>Nama Resep</p>
            <input autoComplete='off' onChange={this.handleNamaResep.bind(this)} value={this.state.namaresep} type="text" id='formwidth1' className="form-control" formwidthplaceholder="Nama Resep" />
          </div>
          <div className="form-group">
            <p className='labelf'>Bahan-bahan</p>
          </div>

          <div className='formdivider'>
            <ul>
              {list}
            </ul>
          </div>
          <div className='dummykotak'></div>

          <div className="form-group">
            <p className='labelf'>Proses Pembuatan</p>
            <div className='tambahlangkah'></div>
            <input autoComplete='off' onChange={this.handleDetail.bind(this)} value={this.state.detail} id='formwidth3' className="form-control" rows='15' />
          </div>

          <section className='rectangle'>
            <Dropzone className='dropzone' onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
              <p className='poto'>Tambahkan foto +</p>
            </Dropzone>
          </section>
          <div className='imgpos'>
            {
              images.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='previewimg'/>)
            }
          </div>
          <button className='bagikan'>Bagikan <span className='glyphicon glyphicon-share'></span></button>
        </form>
        {
          this.state.editing &&
          <div style={styleTambahBahan}>
            <form>
          <input id='ampasin' onChange={this.handleEditChange.bind(this)} defaultValue={this.state.handleEditValue} maxLength='48' onKeyDown={this.pseudoSubmit.bind(this)} onKeyUp={this.onCancelEdit.bind(this)} autoFocus autoComplete='off' type="text" className="form-control" placeholder="Edit Bahan" />
          </form>
          </div>
        }
          {
            this.state.adding
            ? <form onSubmit={this.bahanSubmit.bind(this)}>
            <div className="form-group">
              <input maxLength='48' ref={input => this.input = input} onKeyUp={this.onCancel.bind(this)} autoFocus autoComplete='off' type="text" style={styleListBahan} className="form-control" placeholder="Tambah Bahan" />
              <p style={styleNote}>Tips: Tekan 'Enter' untuk menambah atau tekan 'ESC' untuk batal <abbr title='Kamu dapat menghapus bahan dengan double click pada nama bahan'><span style={{fontSize: '12px', textDecoration: 'none'}} className='glyphicon glyphicon-question-sign'></span></abbr></p>
            </div>
          </form>
          : <div onClick={this.toggler.bind(this)} style={styleTambahBahan} >Tambah Bahan +</div>
          }
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
