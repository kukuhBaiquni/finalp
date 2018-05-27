import React, {Component} from 'react'

export default class SearchFormHome extends Component {
  render(){
    return(
      <form className='formcari'>
        <div className="col-lg-6">
          <div className="input-group">
            <input id='forml' type="text" className="form-control" placeholder="Cari Resep" />
            <span className="input-group-btn">
              <button className="btn btn-default" id='tom' type="button"><span className='glyphicon glyphicon-search'></span></button>
            </span>
          </div>
        </div>
      </form>
    )
  }
}
