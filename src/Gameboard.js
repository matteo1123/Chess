import React, { Component } from 'react';
import './Gameboard.css';
import GamePiece from "./GamePiece";

class Gameboard extends Component {
    constructor(props){
        super(props);
        this.state={
            Selected:"",
            Moveable:[],
            turn:"W",
            s00:'BlackRook', 
            s01:'BlackKnight',
            s02:'BlackBishop',
            s03:'BlackQueen',
            s04:'BlackKing',
            s05:'BlackBishop',
            s06:'BlackKnight',
            s07:'BlackRook',
            s10:'BlackPawn',
            s11:'BlackPawn',
            s12:'BlackPawn',
            s13:'BlackPawn',
            s14:'BlackPawn',
            s15:'BlackPawn',
            s16:'BlackPawn',
            s17:'BlackPawn',
            s70:'WhiteRook', 
            s71:'WhiteKnight',
            s72:'WhiteBishop',
            s73:'WhiteQueen',
            s74:'WhiteKing',
            s75:'WhiteBishop',
            s76:'WhiteKnight',
            s77:'WhiteRook',
            s60:'WhitePawn',
            s61:'WhitePawn',
            s62:'WhitePawn',
            s63:'WhitePawn',
            s64:'WhitePawn',
            s65:'WhitePawn',
            s66:'WhitePawn',
            s67:'WhitePawn',
        }
        this.gamePiece = this.gamePiece.bind(this);
        this.showMoves = this.showMoves.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.whitePawn = this.whitePawn.bind(this);
        this.blackPawn = this.blackPawn.bind(this);
        this.knight = this.knight.bind(this);
        this.bishop = this.bishop.bind(this);
        this.rook = this.rook.bind(this);
        this.queen = this.queen.bind(this);
        this.king = this.king.bind(this);
    }
     gamePiece(i){
         if(this.state[`s${Math.floor(i/8)}${i%8}`]){
         return (<GamePiece 
                  piece={this.state[`s${Math.floor(i/8)}${i%8}`]}
                  square = {`${Math.floor(i/8)}${i%8}`}
                  showMoves = {this.showMoves}
                   turn={this.state[`s${Math.floor(i/8)}${i%8}`][0] === this.state.turn}  
                     />)
     }
                       }
    showMoves(piece, idx){
       
        if(this.state.turn !== piece[0]){
            return 0;
        }
        this.setState({Moveable: []})        
        document.getElementById(idx).classList.add("Selected");
        this.setState({Selected: idx});
        
        if(piece ==="WhitePawn"){
            this.whitePawn(piece, idx);
        }
        if(piece ==="BlackPawn"){
            this.blackPawn(piece, idx);
        }
        if(piece.slice(-6) === "Knight"){
            this.knight(piece, idx);
        }
         if(piece.slice(-6) === "Bishop"){
            this.bishop(piece, idx);
        }
        if(piece.slice(-4) === "Rook"){
            this.rook(piece, idx);
        }
        if(piece.slice(-5) === "Queen"){
            this.queen(piece, idx);
        }
        if(piece.slice(-4) === "King"){
            this.king(piece, idx);
        }
        
    }
    king(piece, idx){
        console.log("king", piece, idx);
        

        let possibilities =[`${Number(idx[0])+1}${idx[1]}`,`${Number(idx[0])-1}${idx[1]}`,`${Number(idx[0])+1}${Number(idx[1])+1}`,`${Number(idx[0])+1}${Number(idx[1])-1}`,                                         `${Number(idx[0])-1}${Number(idx[1])-1}`,`${Number(idx[0])-1}${Number(idx[1])+1}`,`${idx[0]}${Number(idx[1])+1}`,`${idx[0]}${Number(idx[1])-1}`];
        let Moveable = possibilities.filter((p) => {
            if(p[0]<0 || p[0] > 7) return false;
            if(p[1]<0 || p[1] >7) return false;
            if(p.includes("-")) return false;
            if(this.state[`s${p}`]){ 
                if(this.state[`s${p}`][0] === piece[0]) return false;
            }
            return true;
            
        });
        console.log(possibilities, Moveable);
 
        if(Moveable.length > 0){
            this.setState({Moveable: Moveable});
        }
    }
    queen(piece, idx){
        let possibilities = [];
        let top = "";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) -i;
            let y = Number(idx[1]);    
            if(x <= 0){
                    top = `0${y}`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        top= `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            top = `${x}${y}`;
                            break  
                          }else{
                            top = `${Number(x)}${Number(y)}`;
                            break
                          }
                        }   
                  }
            }
        let bottom = "";
        for(let i = 0; i <= 8; i++){
            let x = `${Number(idx[0]) +i}`;
            let y = `${Number(idx[1])}`;    
            if(x >= 7){
                    bottom = `${x}${y}`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        bottom = `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            bottom = `${x}${y}`;
                            break  
                          }else{
                            bottom = `${Number(x)}${Number(y)}`;
                            break
                          }
                        }
                  }
            }
        let left = "";
        for(let i = 0; i <= 7; i++){
            let x = Number(idx[0]);
            let y = Number(idx[1]) - i;
            if(y <=0){
                    left = `${x}0`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                          
                        left = `${x}${y}`;
                        break;
                      }else{
                            left = `${x}${Number(y)}`;
                            break
                          
                        }
                  }
            }
        let right = "";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]);
            let y = Number(idx[1]) +i;    
            if(y >= 7){
                    right = `${x}7`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        right = `${x}${y}`;
                        break;
                      }else{

                            right = `${Number(x)}${Number(y)}`;
                            break            
                        }   
                  }
            }
        let topRight = "";
        for(let i = 0; i <= 8; i++){
            let x = `${Number(idx[0]) -i}`;
            let y = `${Number(idx[1]) +i}`;
            if(x <= 0 || y >= 7){
              
                    topRight = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        topRight = `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            topRight = `${x}${y}`;
                            break  
                          }else{
                            topRight = `${Number(x)-1}${Number(y)+1}`;
                            break
                          }
                        }   
                  }
            }
        let bottomRight ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) +i;
            let y = Number(idx[1]) +i;
            if(x >= 7 || y >= 7){

                    bottomRight = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i>0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              bottomRight = `${x}${y}`;
                              break;
                         }else{
                          if(i ===1){
                            bottomRight = `${x}${y}`;
                            break  
                          }else{
                            bottomRight = `${x+1}${y+1}`;
                            break
                          }
                        }   
                  }
            }
        let bottomLeft ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) +i;
            let y = Number(idx[1]) -i;
            if(x >= 7 || y <= 0){
                    bottomLeft = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`]  && i>0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              bottomLeft = `${x}${y}`;
                              break;
                      }else{
                          if(i ===1){
                            bottomLeft = `${x}${y}`;
                            break  
                          }else{
                            bottomLeft = `${x+1}${y-1}`;
                            break
                          }
                        }   
                  }
            }
        let topLeft ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) -i;
            let y = Number(idx[1]) -i;
            if(x <= 0 || y <= 0){
                    topLeft = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i > 0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              topLeft = `${x}${y}`;
                              break;
                      }else{
                          if(i ===1){
                            topLeft = `${x}${y}`;
                            break  
                          }else{
                            topLeft = `${x-1}${y-1}`;
                            break
                          }
                        }   
                  }
            }
        
        
    for(let i = 0; i <= 8; i++){
            let x = `${Number(top[0]) +i}`;
            let y = `${Number(top[1])}`;

           if(`${x}${y}` === bottom){
               if(x>=0 && x<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        for(let i = 0; i <= 8; i++){
            let x = `${Number(right[0])}`;
            let y = `${Number(right[1])-i}`;
           if(`${x}${y}` === left){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
         for(let i = 0; i <= 8; i++){
            let x = `${Number(topLeft[0]) +i}`;
            let y = `${Number(topLeft[1]) +i}`;
           if(`${x}${y}` === bottomRight){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        for(let i = 0; i <= 8; i++){
            let x = `${Number(topRight[0]) +i}`;
            let y = `${Number(topRight[1]) -i}`;
           if(`${x}${y}` === bottomLeft){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        
        let Moveable = possibilities.filter((p) => {
            if(p[0]<0 || p[0] > 7) return false;
            if(p[1]<0 || p[1] >7) return false;
            if(p.includes("-")) return false;
            if(this.state[`s${p}`]){ 
                if(this.state[`s${p}`][0] === piece[0]) return false;
            }
            return true;
            
        }
        );
        
 
        if(Moveable.length > 0){
            this.setState({Moveable: Moveable});
        }


    }
    rook(piece, idx){
        let possibilities = [];
        let top = "";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) -i;
            let y = Number(idx[1]);    
            if(x <= 0){
                    top = `0${y}`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        top= `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            top = `${x}${y}`;
                            break  
                          }else{
                            top = `${Number(x)}${Number(y)}`;
                            break
                          }
                        }   
                  }
            }
        let bottom = "";
        for(let i = 0; i <= 8; i++){
            let x = `${Number(idx[0]) +i}`;
            let y = `${Number(idx[1])}`;    
            if(x >= 7){
                    bottom = `${x}${y}`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        bottom = `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            bottom = `${x}${y}`;
                            break  
                          }else{
                            bottom = `${Number(x)}${Number(y)}`;
                            break
                          }
                        }
                  }
            }
        let left = "";
        for(let i = 0; i <= 7; i++){
            let x = Number(idx[0]);
            let y = Number(idx[1]) - i;
            if(y <=0){
                    left = `${x}0`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                          
                        left = `${x}${y}`;
                        break;
                      }else{
                            left = `${x}${Number(y)}`;
                            break
                          
                        }
                  }
            }
        let right = "";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]);
            let y = Number(idx[1]) +i;    
            if(y >= 7){
                    right = `${x}7`;
                    break;
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        right = `${x}${y}`;
                        break;
                      }else{

                            right = `${Number(x)}${Number(y)}`;
                            break            
                        }   
                  }
            }
    for(let i = 0; i <= 8; i++){
            let x = `${Number(top[0]) +i}`;
            let y = `${Number(top[1])}`;

           if(`${x}${y}` === bottom){
               if(x>=0 && x<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        for(let i = 0; i <= 8; i++){
            let x = `${Number(right[0])}`;
            let y = `${Number(right[1])-i}`;
           if(`${x}${y}` === left){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        
        let Moveable = possibilities.filter((p) => {
            if(p[0]<0 || p[0] > 7) return false;
            if(p[1]<0 || p[1] >7) return false;
            if(p.includes("-")) return false;
            if(this.state[`s${p}`]){ 
                if(this.state[`s${p}`][0] === piece[0]) return false;
            }
            return true;
            
        }
        );
        
 
        if(Moveable.length > 0){
            this.setState({Moveable: Moveable});
        }

        
    }
    bishop(piece, idx){
        let possibilities = [];
        let topRight = "";
        for(let i = 0; i <= 8; i++){
            let x = `${Number(idx[0]) -i}`;
            let y = `${Number(idx[1]) +i}`;
            if(x <= 0 || y >= 7){
              
                    topRight = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i>0){
                      if(this.state[`s${x}${y}`][0]  === piece[0]){
                        topRight = `${x}${y}`;
                        break;
                      }else{
                          if(i ===1){
                            topRight = `${x}${y}`;
                            break  
                          }else{
                            topRight = `${Number(x)-1}${Number(y)+1}`;
                            break
                          }
                        }   
                  }
            }
        let bottomRight ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) +i;
            let y = Number(idx[1]) +i;
            if(x >= 7 || y >= 7){

                    bottomRight = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i>0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              bottomRight = `${x}${y}`;
                              break;
                         }else{
                          if(i ===1){
                            bottomRight = `${x}${y}`;
                            break  
                          }else{
                            bottomRight = `${x+1}${y+1}`;
                            break
                          }
                        }   
                  }
            }
        let bottomLeft ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) +i;
            let y = Number(idx[1]) -i;
            if(x >= 7 || y <= 0){
                    bottomLeft = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`]  && i>0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              bottomLeft = `${x}${y}`;
                              break;
                      }else{
                          if(i ===1){
                            bottomLeft = `${x}${y}`;
                            break  
                          }else{
                            bottomLeft = `${x+1}${y-1}`;
                            break
                          }
                        }   
                  }
            }
        let topLeft ="";
        for(let i = 0; i <= 8; i++){
            let x = Number(idx[0]) -i;
            let y = Number(idx[1]) -i;
            if(x <= 0 || y <= 0){
                    topLeft = `${x}${y}`;
                    break;
                
            }
                  if(this.state[`s${x}${y}`] && i > 0){
                        if(this.state[`s${x}${y}`][0]  === piece[0]){
                              topLeft = `${x}${y}`;
                              break;
                      }else{
                          if(i ===1){
                            topLeft = `${x}${y}`;
                            break  
                          }else{
                            topLeft = `${x-1}${y-1}`;
                            break
                          }
                        }   
                  }
            }
        
        
        for(let i = 0; i <= 8; i++){
            let x = `${Number(topLeft[0]) +i}`;
            let y = `${Number(topLeft[1]) +i}`;
           if(`${x}${y}` === bottomRight){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){ 
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        for(let i = 0; i <= 8; i++){
            let x = `${Number(topRight[0]) +i}`;
            let y = `${Number(topRight[1]) -i}`;
           if(`${x}${y}` === bottomLeft){
               if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
               break;
           }
            if(`${x}${y}` !== idx){
                if(x>=0 && x<=7 && y>=0 && y<=7)possibilities.push(`${x}${y}`)
            }

        }
        
        let Moveable = possibilities.filter((p) => {
            if(p[0]<0 || p[0] > 7) return false;
            if(p[1]<0 || p[1] >7) return false;
            if(p.includes("-")) return false;
            if(this.state[`s${p}`]){ 
                if(this.state[`s${p}`][0] === piece[0]) return false;
            }
            return true;
            
        }
        );
        
 
        if(Moveable.length > 0){
            this.setState({Moveable: Moveable});
        }
        
    }
    knight(piece, idx){

        let possibilities = [`${Number(idx[0])+2}${Number(idx[1])+1}`,`${Number(idx[0])+2}${Number(idx[1])-1}`,`${Number(idx[0])+1}${Number(idx[1])+2}`,`${Number(idx[0])+1}${Number(idx[1])-2}`,
                             `${Number(idx[0])-2}${Number(idx[1])+1}`,`${Number(idx[0])-2}${Number(idx[1])-1}`,`${Number(idx[0])-1}${Number(idx[1])+2}`,`${Number(idx[0])-1}${Number(idx[1])-2}`]; 
        let Moveable = possibilities.filter((p) => {
            if(p[0]<0 || p[0] > 7) return false;
            if(p[1]<0 || p[1] >7) return false;
            if(p.includes("-")) return false;
            if(this.state[`s${p}`]){ 
                if(this.state[`s${p}`][0] === piece[0]) return false;
            }
            return true;
            
        });
        
 
        if(Moveable.length > 0){
            this.setState({Moveable: Moveable});
        }
    }
    blackPawn(piece, idx){
        let Moveable = [];
            if(!this.state[`s${Number(idx[0])+1}${idx[1]}`]){
                Moveable.push(`${Number(idx[0])+1}${idx[1]}`);
            }
            if(Number(idx[0]) === 1 && !this.state[`s2${idx[1]}`]){
                Moveable.push(`${Number(idx[0])+2}${idx[1]}`);
            }
            if(this.state[`s${Number(idx[0])+1}${Number(idx[1])-1}`] && this.state[`s${Number(idx[0])+1}${Number(idx[1])-1}`][0] !== piece[0]){
                Moveable.push(`${Number(idx[0])+1}${Number(idx[1])-1}`);
            }
            if(this.state[`s${Number(idx[0])+1}${Number(idx[1])+1}`] && this.state[`s${Number(idx[0])+1}${Number(idx[1])+1}`][0] !== piece[0]){
                Moveable.push(`${Number(idx[0])+1}${Number(idx[1])+1}`);
            }
            if(Moveable.length > 0){
                this.setState({Moveable: Moveable});
            }
    }
    whitePawn(piece, idx){
            let Moveable = [];
            if(!this.state[`s${Number(idx[0])-1}${idx[1]}`]){
                Moveable.push(`${Number(idx[0])-1}${idx[1]}`);
            }
            if(this.state[`s${Number(idx[0])-1}${Number(idx[1])-1}`] && this.state[`s${Number(idx[0])-1}${Number(idx[1])-1}`][0] !== piece[0]){
                Moveable.push(`${Number(idx[0])-1}${Number(idx[1])-1}`);
            }
            if(this.state[`s${Number(idx[0])-1}${Number(idx[1])+1}`] && this.state[`s${Number(idx[0])-1}${Number(idx[1])+1}`][0] !== piece[0]){
                Moveable.push(`${Number(idx[0])-1}${Number(idx[1])+1}`);
            }
            if(Number(idx[0]) === 6 && !this.state[`s5${idx[1]}`]){
                Moveable.push(`${Number(idx[0])-2}${idx[1]}`);
            }
            if(Moveable.length > 0){
                this.setState({Moveable: Moveable});
            }
    }
    makeMove(evt){
        if(evt.target.classList.contains("Moveable")){
            let idx = `s${this.state.Selected}`;
            let newIdx = `s${evt.target.id}`;
            this.setState((s) =>{ 
                s[newIdx] = s[idx]
                s[idx] = "";
                s['Selected'] = "";
                if(s["turn"] === "W")
                {
                    s["turn"] ="B";
                }else{
                    s["turn"] = "W";
                }
                s["Moveable"] = [];
                s["Selected"] = "";
                return s;
                })
        }
    }   
    render() {
         
        //deselect previously selected 
        if(document.querySelector(".Selected")){
               document.querySelectorAll(".Selected").forEach((S) => S.classList.toggle("Selected"));
           }
        if(document.querySelector(".Moveable")){
            document.querySelectorAll(".Moveable").forEach((M) => M.classList.toggle("Moveable"));
        }
        if(this.state.Selected){
            document.getElementById(this.state.Selected).classList.add("Selected");    
        }
        if(this.state.Moveable.length > 0){
            console.log(this.state.Moveable);
            this.state.Moveable.map((idx) => {
                
                document.getElementById(idx).classList.add("Moveable");    
                return 0;
            })        
        
        }
            let squares = [];
        //{`${Math.floor(i/8)} ${i%8}`}
          for(let i = 0; i < 64; i++){
              if((i+ Math.floor(i/8))%2  === 0){
                  squares.push(<div id={`${Math.floor(i/8)}${i%8}`} onClick={this.makeMove} key={i} className="square">{this.gamePiece(i)}</div>);   
              }else{
                  
                  squares.push(
                      <div key={i} id={`${Math.floor(i/8)}${i%8}`} onClick={this.makeMove} className="black square">
                          {this.gamePiece(i)}
                      </div>
                  );
              }
          }
    return (
        <div className = {this.props.css}>
          <div className="Gameboard">
                {squares}

          </div>
      </div>
    );
  }
}

export default Gameboard;
