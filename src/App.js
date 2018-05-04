import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './lib.min.css'
import generateBarcode from "pdf417";
import fileSystem from 'fs';
import qr from 'qr-image';

class App extends Component {

 constructor(props){
   super(props);
   this.state = ({
     image:null,
     inputValue:'',
     qr:null,
   })
 }
 Barcode = () => {
   console.log(this.state.inputValue);
   var qr_svg = qr.image('I love QR!', { type: 'png' });
   var svg_string = qr.imageSync(this.state.inputValue, { type: 'png' });
   var decoder = new TextDecoder('utf8');
   var b64encoded = btoa(String.fromCharCode.apply(null, svg_string));
   console.log(b64encoded);
   
  this.setState({
    image:generateBarcode(this.state.inputValue,2,1),
    qr:"data:image/gif;base64,"+b64encoded,
  })
 }

 updateInputValue=(evt)=> {
   console.log(this.state.inputValue);
   
  this.setState({
    inputValue: evt.target.value
  });
}
  render() {

    
   

    return (
      <div className="">
        <header className="App-header">
          <h1 className="App-title">Barcode Testing</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className='container'>
           <div className='row'>
            <div className='col-md-6'>
              <input type='text' className='form-control' />
              <div className='mt-2 text-center'>
                <img src={generateBarcode("asdfghjkl23456789", 2, 1)} alt='hello' />
              </div>
            </div>
            <div className='col-md-6'>
              <input type='text' className='form-control' placeholder='Enter new ID here' onChange={this.updateInputValue.bind(this)} />
              <div className='mt-2 text-center'>
                <button className='btn btn-success' onClick={()=>this.Barcode()} >Generate BARCODE</button>
                <br/>
                <img src={this.state.image} alt='some text' />
                <img src={this.state.qr} alt='someotehr text' />
              </div>
            </div>
           </div>
        </div>
      </div>
    );
  }
}

export default App;
