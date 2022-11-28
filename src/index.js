import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './logo.svg';

// import 'bootstrap/dist/css/bootstrap.min.css';

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
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {

      history: [{
        squares: Array(9).fill(null),
      }],

      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),

      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      // const gameHistory = 'Game History":'
      return (                                // game history buttons
        // <li key={gameHistory}>{gameHistory}</li>
        <li className='liDiv' key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });



    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (                                               // *** main HTML
    <div className='container'>
    <div className='headerDiv'>
      <div className='headerWrapper'>
        <div><img src={logo} className="App-logo" alt="logo" /></div>

        <h1 className='header'>Tic-Tac-Toe</h1>
      </div>
    </div>
      <div className="game">
        <div className="game-board">
        <Board
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-blank-space">
        </div>
        <div className="game-info">
          <div className='nextPlayer'>{ status }</div>
            <ul className='gameHistory'>{ moves }</ul>
        </div>
      </div>
    </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [           // every possible winning combination
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}