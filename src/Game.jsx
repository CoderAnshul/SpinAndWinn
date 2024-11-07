import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './index.css';
import win from "./assets/images/win.gif"
import grass from "./assets/images/grass.png"
import bat from "./assets/images/bat.png"
import helmet from "./assets/images/helmet.png"
import paytm from "./assets/images/paytm.png"
import gift from "./assets/images/giftOne.png"
import bg from "./assets/images/bg.png"

import soundone from './assets/audio/rotate.mp3';
import soundTwo from './assets/audio/click.mp3';

const prizes = [
  "₹100", "Lose", "₹500", "Lose", "₹1000", "Lose", "₹2000", "Lose"
];

export default function Game() {
  const segmentAngle = 45;
  const initialOffset = 22.5;
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(initialOffset);
  const [result, setResult] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Preload audio files
  const rotateSound = new Audio(soundone);
  rotateSound.preload = "auto"; // Preload the audio

  const clickSound = new Audio(soundTwo);
  clickSound.preload = "auto"; // Preload the audio

  // Play click sound
  const playClickSound = () => {
    new Audio(soundTwo).play();
  };







  // const spinWheel = useCallback(() => {
  //   if (isSpinning) return;
  
  //   // Play sound when the wheel starts spinning
  //   rotateSound.play().catch((error) => {
  //     console.log("Rotate sound play failed:", error);
  //   });
  
  //   setIsSpinning(true);
  
  //   // Set up a new random rotation for this spin
  //   const randomRotation = Math.floor(Math.random() * 360);
  //   const newRotation = rotation + 1440 + randomRotation; // 1440 ensures at least 4 full rotations
  
  //   setRotation(newRotation + initialOffset);
  
  //   setTimeout(() => {
  //     setIsSpinning(false);
  
  //     // Stop the rotate sound when spinning stops
  //     rotateSound.pause();
  //     rotateSound.currentTime = 0;
  
  //     // Calculate the winning prize based on the rotation
  //     const normalizedRotation = (newRotation % 360);
  //     const winningPrizeIndex = Math.floor(((360 - normalizedRotation) + initialOffset) / segmentAngle) % prizes.length;
  
  //     // 99% chance to play; no forced win if "Lose" is selected
  //     const resultIndex = Math.random() < 0.99 ? winningPrizeIndex : prizes.findIndex(prize => prize === "Lose");
  
  //     setResult(prizes[resultIndex]);
  //     setShowDialog(true);
  //   }, 5000); // duration of the spinning animation
  // }, [isSpinning, rotation, rotateSound, initialOffset, prizes, segmentAngle]);


  // const spinWheel = useCallback(() => {
  //   if (isSpinning) return;
  
  //   // Play sound when the wheel starts spinning
  //   rotateSound.play().catch((error) => {
  //     console.log("Rotate sound play failed:", error);
  //   });
  
  //   setIsSpinning(true);
  
  //   // Set up a new random rotation for this spin
  //   const randomRotation = Math.floor(Math.random() * 360);
  //   const newRotation = rotation + 1440 + randomRotation; // 1440 ensures at least 4 full rotations
  
  //   setRotation(newRotation + initialOffset);
  
  //   setTimeout(() => {
  //     setIsSpinning(false);
  
  //     // Stop the rotate sound when spinning stops
  //     rotateSound.pause();
  //     rotateSound.currentTime = 0;
  
  //     // Calculate the winning prize based on the rotation
  //     const normalizedRotation = (newRotation % 360);
  //     const winningPrizeIndex = Math.floor(((360 - normalizedRotation) + initialOffset) / segmentAngle) % prizes.length;
  
  //     // 99% chance to land on a valid prize, 1% chance to land on "Lose"
  //     let resultIndex = winningPrizeIndex;
  //     if (Math.random() < 0.01) {
  //       // If the random number is less than 0.01, show "Lose" (1% chance)
  //       resultIndex = prizes.findIndex(prize => prize === "Lose");
  //     }
  
  //     setResult(prizes[resultIndex]);
  //     setShowDialog(true);
  //   }, 5000); // duration of the spinning animation
  // }, [isSpinning, rotation, rotateSound, initialOffset, prizes, segmentAngle]);
  
  
  
  const spinWheel = useCallback(() => {
    if (isSpinning) return;
  
    // Play sound when the wheel starts spinning
    rotateSound.play().catch((error) => {
      console.log("Rotate sound play failed:", error);
    });
  
    setIsSpinning(true);
  
    // Set up a new random rotation for this spin
    const randomRotation = Math.floor(Math.random() * 360);
    const newRotation = rotation + 1440 + randomRotation; // 1440 ensures at least 4 full rotations
  
    setRotation(newRotation + initialOffset);
  
    setTimeout(() => {
      setIsSpinning(false);
  
      // Stop the rotate sound when spinning stops
      rotateSound.pause();
      rotateSound.currentTime = 0;
  
      // 99% chance to land on a valid prize, 1% chance to land on "Lose"
      let resultIndex;
  
      if (Math.random() < 0.001) {
        // 1% chance to land on "Lose"
        resultIndex = prizes.findIndex(prize => prize === "Lose");
      } else {
        // 99% chance to land on a valid prize
        const normalizedRotation = (newRotation % 360);
        const winningPrizeIndex = Math.floor(((360 - normalizedRotation) + initialOffset) / segmentAngle) % prizes.length;
        resultIndex = winningPrizeIndex;
      }
  
      setResult(prizes[resultIndex]);
      setShowDialog(true);
    }, 5000); // duration of the spinning animation
  }, [isSpinning, rotation, rotateSound, initialOffset, prizes, segmentAngle]);
  
  

  // Handle prize claim
  const handleClaimPrize = () => {
    console.log("Prize claimed:", result);
    setShowDialog(false);

    if (result !== "Lose") {
      navigate("/payment-methods");
    }
  };

  // Stop sound when the modal opens
  useEffect(() => {
    if (showDialog) {
      rotateSound.pause(); // Pause the rotate sound when modal is shown
      rotateSound.currentTime = 0; // Optionally reset the sound to start from the beginning next time
    }
  }, [showDialog]); // When showDialog changes (modal open/close)

  return (
    <div className="mainScreen min-h-screen bg-gradient-to-b from-[#3D8ADC] to-[#A7F3D0]  flex flex-col items-center justify-center p-4">


<div className="h-auto absolute p-1 top-[70px] rounded-md left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-orange-500">
  <div className="h-10 w-[100px] bg-white rounded-md p-3">
    <img className="h-full w-full object-contain scale-[4.5]" src={paytm} alt="" />
  </div>
</div>

      <div className="-mb-24 -mt-24">
        <div className="relative">
          <span className="absolute -left-4 -top-2 text-white text-xl">✦</span>
          <span className="absolute -right-4 top-0 text-white text-sm">✦</span>

          <svg width="300"  viewBox="0 0 300 100" className="w-full h-[197px] max-w-[300px]">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#7b74eb" floodOpacity="0.5"/>
                <feDropShadow dx="4" dy="4" stdDeviation="1" floodColor="#7b74eb" floodOpacity="0.3"/>
                <feDropShadow dx="6" dy="6" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
              </filter>
            </defs>
            <path id="curve" d="M10,20 Q150,-20 290,20" fill="transparent"/>
            <text className="text-4xl md:text-5xl font-bold" fill="#f8f9ff" filter="url(#shadow)" style={{ fontSize: '40px' }}>
              <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                LUCKY WHEEL
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className="relative w-[320px] h-[320px] md:w-80 md:h-80">
        <motion.div
          className="w-full h-full rounded-full bg-white shadow-lg"
          style={{
            backgroundImage: "conic-gradient(#FFD700 0deg 45deg, #FF71BD 45deg 90deg, #FFD700 90deg 135deg, #FF71BD 135deg 180deg, #FFD700 180deg 225deg, #FF71BD 225deg 270deg, #FFD700 270deg 315deg, #FF71BD 315deg 360deg)"
          }}
          
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeInOut" }}
        >
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-center"
              style={{ transform: `rotate(${index * segmentAngle}deg)` }}
            >
              <div
                className="text-sm md:text-base font-bold text-center"
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: '30px',
                  transform: 'rotate(-22deg)', // Rotate to center between lines
                  width: '50%',
                  textAlign: 'center',
                  fontSize: '20px'
                }}
              >
                <span className="bg-opacity-50 px-2 py-1 rounded text-black">
                  {prize}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

         {/* Dots around the wheel */}
         {[...Array(40)].map((_, index) => {  
          const angle = (index * 9) + initialOffset; 
          const x = Math.cos((angle * Math.PI) / 180) * 152 + 120;  
          const y = Math.sin((angle * Math.PI) / 180) * 152 + 120;  
          return (
            <div
              key={index}
              className="absolute bg-white rounded-full"
              style={{
                marginTop: '40px',
                marginLeft: '40px',
                top: `${y}px`,
                left: `${x}px`,
                width: '5px',  
                height: '5px',  
                transform: 'translate(-50%, -50%)',
                opacity:'0.8'
              }}
            />
          );
        })}


        {/* Arrow positioned at the bottom, pointing upwards */}
        <div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '15px solid red', // Point arrow downwards
          }}
        />

        <button
          onClick={() => {
            playClickSound();
            spinWheel();
          }}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Spin the wheel"
        >
          TAP
        </button>
      </div>

      {/* <p className="mt-8 text-white text-center text-lg font-semibold">
        Tap to spin and win exciting cash prizes!
      </p> */}

<Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
  {/* Dark overlay with opacity */}
  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />

  {/* Centered Dialog Content */}
  <Dialog.Content className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-6 h-46 rounded-lg max-w-xs w-full sm:max-w-md relative">
      
      {/* Conditionally display win image if result is not "Lose" */}
      {result !== "Lose" ? (
        <img src={win} alt="You Won!" className="h-auto mb-4 absolute -top-[168px] left-0 w-40 translate-x-1/2" />
      ) : (
        <img src={helmet} alt="You Won!" className="h-auto mb-4 absolute -top-[138px] left-0 w-40 translate-x-1/2" />
      )}
      
      {/* Close Button */}
      <Dialog.Close asChild>
        <button
          className="absolute top-2 right-2 text-xl text-black"
          aria-label="Close"
        >
          &times;
        </button>
      </Dialog.Close>
      
      {/* Display win or lose message using a ternary operator */}
      <h2 className="text-2xl text-black font-bold text-center">
        {result === "Lose" ? "Oops! Better Luck Next Time!" : `You Won: ${result}`}
      </h2>
      
      {/* Conditionally render Claim Prize button if the result is not "Lose" */}
      {result !== "Lose" ? (
        <button
          onClick={handleClaimPrize}
          className="w-full mt-4 py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition"
        >
          Claim Prize
        </button>
      ) : null}
      
      {/* Play Again Button (always displayed) */}
      <button
        onClick={() => {
          setShowDialog(false); 
          setResult(null);     
        }}
        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition"
      >
        Play Again
      </button>
    </div>
  </Dialog.Content>
</Dialog.Root>



      {/* <img src={bat} className="absolute h-44 -rotate-12 -bottom-10 left-5 z-10" alt="" /> */}
      <img src={gift} className="absolute h-44 -bottom-20 -left-44 z-30" alt="" />
      <img src={grass} className="absolute -bottom-4 left-0 z-20" alt="" />
      <img src={gift} className="absolute h-44 -bottom-10 -right-64 z-10" alt="" />
    </div>
  );
}
