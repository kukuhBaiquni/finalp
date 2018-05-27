import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom';

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
  }

  resepSubmit(e){
    e.preventDefault()
    var namaresep = this.state.namaresep;
    var bahan = this.state.bahan;
    var detail = this.state.detail;
    var penulis = localStorage.getItem('token')
    var foto = this.state.files[0]
    if (namaresep && bahan && detail && penulis && foto) {
      this.props.tambahResep(namaresep, bahan, detail, penulis, foto)
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
    const { open } = this.state;
    return(
      <div className='resepformholder'>
        <Link to='/' className='thex'>X</Link>
        <form onSubmit={this.resepSubmit}>
          <div className="form-group">
            <label className='labelf'>Nama Resep</label>
            <input autoComplete='off' onChange={this.handleNamaResep.bind(this)} value={this.state.namaresep} type="text" id='formwidth1' className="form-control" formwidthplaceholder="Nama Resep" />
          </div>
          <div className="form-group">
            <label className='labelf'>Bahan-bahan</label>
            <textarea autoComplete='off' onChange={this.handleBahan.bind(this)} value={this.state.bahan} id='formwidth2' className="form-control" rows='4' />
          </div>
          <div className="form-group">
            <label className='labelf'>Detail Proses</label>
            <textarea autoComplete='off' onChange={this.handleDetail.bind(this)} value={this.state.detail} id='formwidth3' className="form-control" rows='15' />
          </div>


          <section className='rectangle'>
            <Dropzone onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
              <p className='poto'>Tambahkan foto</p>
              <span className='glyphicon glyphicon-plus' id='plus'></span>
            </Dropzone>
            {
              this.state.files.map(f => <img key={f.name} src={ f.preview } alt="preview" className='previewimg'/>)
            }
          </section>


          <button className='bagikan'>Bagikan <span className='glyphicon glyphicon-share'></span></button>
        </form>
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
