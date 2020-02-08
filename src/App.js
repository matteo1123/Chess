import React, { Component } from 'react';
import './App.css';
import Gameboard from './Gameboard';

class App extends Component {
    constructor(props){
        super(props);
        this.state={className:""}
        this.flipBoard = this.flipBoard.bind(this);
    }
    
    flipBoard(){
        if(this.state.className){
            this.setState({className: ""})   
        }else{
            this.setState({className: "Rotated"})
        }
        
    }
  render() {
    return (
      <div className="App">
            <Gameboard css={this.state.className}/>
            <button onClick={this.flipBoard}>Rotate Board </button>

      </div>
    );
  }
}

export default App;
