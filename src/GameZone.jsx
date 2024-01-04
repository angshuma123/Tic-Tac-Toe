import React, { useState, useEffect } from 'react';
import './GameZone.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const GameZone = () => {
  const notify = () => {
    toast("Invitation link copied");
    console.log("Done");
  };

  let [quote, setQuote] = useState('Be brave and active');
  let [id, setId] = useState(1);
  let [home, setHome] = useState(true);

  const Fetch = async () => {
    try {
      let res = await fetch("https://api.adviceslip.com/advice");
      let data = await res.json();
      
      setQuote(data.slip.advice);
      setId(data.slip.id);
    } catch (e) {
      console.log("Error occurs");
    }
  };

  useEffect(() => {
    let timerId = setInterval(() => {
      Fetch();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  let[board,setBoard]=useState(Array(9).fill(''));
  let[move,setMove]=useState('X');
  const handleClick=(n)=>{
    if(board[n]!==""){
      return
    }
    let Square=[...board];
    Square[n]=move;
    setBoard(Square);
    if(move==='X'){
      setMove('O');
    }else{
      setMove('X');
    }
   if (CheckWinner(Square)){
   alert("Winner");
   Square.fill('');
   setBoard(Square);

   }
   if(CheckDraw(Square)){
    alert("Draw");
    Square.fill('');
   setBoard(Square);
   }

   
  }
  const CheckDraw=(board)=>{
    let Count=0;
    board.map((element)=>{
      if(element!==""){
        Count++;
      }
    })
    if(Count>=9){
      return true
    }else {
      return false;
    }
   }
  const CheckWinner=(board)=>{
    const Conditions=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]

    ]
    let Flag=false;
    
    Conditions.map((element)=>{
      if(board[element[0]]!=='' && board[element[1]]!=='' && board[element[2]]!=='' ){
        if(board[element[0]]===board[element[1]] && board[element[1]]===board[element[2]]){
           Flag = true;
        }

      }
    })
    return Flag;

  }
 

  return (
    <>
      <div className="Gamearea">
        {home ? (
          <div className="Group-8">
            <div className='Text-1'><h2 className='x'>x</h2> <h2 className='o'>o</h2></div>
            <div className="Pickplayer">
              <h3>PICK PLAYER</h3>
              <div className="Group-1"><button className='Left'><h2 className='x'>x</h2></button><button className='Right'><h2 className='o'>o</h2></button></div>
            </div>
            <button className='Newgame' onClick={() => setHome(!home)}>NEW GAME(VS CPU)</button><br /><br />
            <button className='Newupdate'>NEW GAME(VS HUMAN)coming soon</button><br /><br /><br />
            <button className='Invite' onClick={notify}>Invite your friend</button>
            <ToastContainer
              theme='dark'
              hideProgressBar={true}
              toastStyle={{ color: '#F2B237' }}
              style={{ width: '220px', height: '41px' }}
            />
          </div>
        ) : (
          <div className="buttons">
            <div className="buttonarea-1">
              <div className="image"><h2 className='x1'>x</h2> <h2 className='o1'>o</h2></div>
              <button className='turn'>X Turn</button>
              <button className='refresh'><span className='icon-1'><FontAwesomeIcon icon={faArrowsRotate} /></span></button>
            </div>
            <div className="buttonarea-2">
              <div className="row-1">
                <button onClick={()=>handleClick(0)}  className="boxes"><p className='X'>{board[0]}</p></button>
                <button onClick={()=>handleClick(3)}  className="boxes"><p className='X'>{board[3]}</p></button>
                <button onClick={()=>handleClick(6)}  className="boxes"><p className='X'>{board[6]}</p></button>
              </div>
              <div className="row-2">
                <button onClick={()=>handleClick(1)}  className="boxes"><p className='X'>{board[1]}</p></button>
                <button  onClick={()=>handleClick(4)} className="boxes"><p className='X'>{board[4]}</p></button>
                <button onClick={()=>handleClick(7)}  className="boxes"><p className='X'>{board[7]}</p></button>
              </div>
              <div className="row-3">
                <button  onClick={()=>handleClick(2)} className="boxes"><p className='X'>{board[2]}</p></button>
                <button onClick={()=>handleClick(5)}  className="boxes"><p className='X'>{board[5]}</p></button>
                <button onClick={()=>handleClick(8)}  className="boxes"><p className='X'>{board[8]}</p></button>
              </div>
            </div>
            <div className="buttonarea-3">
              <div className="You Scores"><p>x (YOU)</p><h3>0</h3></div>
              <div className="Ties Scores"><p>x (YOU)</p><h3>0</h3></div>
              <div className="Cpu Scores"><p>x (YOU)</p><h3>0</h3></div>
            </div>
          </div>
        )}
      </div>
      <div className="Quotesection">
        <h3><p style={{ color: '#31C4BE' }}>#Quote:{id}</p>{quote}</h3>
      </div>
    </>
  );
};

export default GameZone;
