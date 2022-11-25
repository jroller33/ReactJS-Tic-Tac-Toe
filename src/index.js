import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// there's 3 react components: Square, Board and Game


// Square: renders a single <button>
// instead of Square being a class, it's now going to be a function component
// bc it will only contain a render method and doesn't have its own state

function Square(props) {
  // this.props.value becomes props.value bc it's no longer in a class
    return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}





// renders 9 squares
class Board extends React.Component {             //    BOARD

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
    />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}






// renders a board
class Game extends React.Component {         //   GAME
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
