import React, {Component} from 'react'
import '../testslide.css'

export default class Slide extends Component {
  render(){
    return(
      <div id="slideshow">
        <div className="slide-wrapper">
          <div className="slide"><h1 className="slide-number">1</h1></div>
          <div className="slide"><h1 className="slide-number">2</h1></div>
          <div className="slide"><h1 className="slide-number">3</h1></div>
          <div className="slide"><h1 className="slide-number">4</h1></div>
          <div className="slide"><h1 className="slide-number">5</h1></div>
        </div>
      </div>
    )
  }
}
