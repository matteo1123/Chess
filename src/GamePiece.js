import React, { Component } from 'react';
import './GamePiece.css';
import BlackRook from './BlackRook.png';
import BlackKing from './BlackKing.png';
import BlackPawn from './BlackPawn.png';
import BlackKnight from './BlackKnight.png';
import BlackBishop from './BlackBishop.png';
import BlackQueen from './BlackQueen.png';
import WhiteRook from './WhiteRook.png';
import WhiteKing from './WhiteKing.png';
import WhitePawn from './WhitePawn.png';
import WhiteKnight from './WhiteKnight.png';
import WhiteBishop from './WhiteBishop.png';
import WhiteQueen from './WhiteQueen.png';

class GamePiece extends Component {
   constructor(props){
       super(props);
       this.state={
           BlackRook:BlackRook,
           BlackKing:BlackKing,
           BlackPawn:BlackPawn,
           BlackKnight:BlackKnight,
           BlackBishop:BlackBishop,
           BlackQueen:BlackQueen,
           WhiteRook:WhiteRook,
           WhiteKing:WhiteKing,
           WhitePawn:WhitePawn,
           WhiteKnight:WhiteKnight,
           WhiteBishop:WhiteBishop,
           WhiteQueen:WhiteQueen
       }
       this.showMoves = this.showMoves.bind(this);
   } 
    showMoves(){
        this.props.showMoves(this.props.piece, this.props.square);
    }
  render() {
      let cl = this.props.cssClass;
      if(this.props.turn) cl += " hvr-float-shadow";
    return (
      <div className="GamePiece">
            <img alt={this.props.piece} className={cl} src={this.state[this.props.piece]} onClick={this.showMoves}/>
      </div>
    );
  }
}
export default GamePiece;