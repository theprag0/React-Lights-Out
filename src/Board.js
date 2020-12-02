import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows:5,
    ncols:5,
    chanceLightStartsOn:0.25
  }

  constructor(props) {
    super(props);

    //Set initial state
    this.state = {
      hasWon : false,
      board : this.createBoard()
    }
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    const {nrows, ncols, chanceLightStartsOn} = this.props;
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++){
      let row = [];
      for (let j = 0; j < ncols; j++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);


    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    // flip current cell and the cells around it
      const coords = [{x:x,y:y}, {x:x,y:y+1}, {x:x,y:y-1}, {x:x+1,y:y}, {x:x-1,y:y}];
      for (let coord of coords){
        flipCell(coord.x, coord.y);
      }
    // win when every cell is turned off
      const hasWon = board.every(row => row.every(cell => !cell));  

      this.setState({board, hasWon});
  }


  /** Render game board or winning message. */
  render() {
    return (
      <div>
        {
          this.state.hasWon ?
          <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">You</span>
            <span className="neon-blue">Win</span>
          </div>
        </div>
        :
        <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {this.state.board.map((row, idx) => {
              return <tr key={`Row-${idx}`}>
                {row.map((cell, i) => {
                  let coord = `${idx}-${i}`;
                  return <Cell key={coord} isLit={cell} flipCellsAroundMe={()=>this.flipCellsAround(coord)}/>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
        }
      </div>
    );
    
    // Alternate Solution

    // const {nrows, ncols} = this.props;
    // let tblBody = [];
    // for (let x = 0; x < nrows; x++){
    //   let row = [];
    //   for (let y = 0; y < ncols; y++){
    //     let coord = `${x}-${y}`
    //     row.push(<Cell key={coord} isLit={this.state.board[x][y]} flipCellsAround={this.flipCellsAround}/>);
    //   }
    //   tblBody.push(<tr>{row}</tr>)
    // }
    // return (
    //  <table className="Board">
    //    <tbody>
    //      {tblBody}
    //    </tbody>
    //  </table>
    // );
  }
}


export default Board;
