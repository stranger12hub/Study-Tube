import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaClock, FaCoffee, FaBrain, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [alarmPlaying, setAlarmPlaying] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            if (isBreak) {
              // Break finished, start work session
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
              setCycles(cycles + 1);
              playAlarm('work-start');
            } else {
              // Work session finished, start break
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
              playAlarm('break-start');
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, cycles]);

  const playAlarm = (type) => {
    if (isMuted) return;

    setAlarmPlaying(true);
    
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      
      // Create oscillator and gain node
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Set volume
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      
      if (type === 'break-start') {
        // Work complete sound - triumphant rising tone
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);
        
        // Second beep for work complete
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
          osc2.frequency.setValueAtTime(880, audioCtx.currentTime);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.3);
        }, 200);
        
        // Visual alert
        alert('✅ Work session complete! Time for a 5-minute break!');
        
      } else {
        // Break complete sound - gentle descending tone
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.8);
        
        // Visual alert
        alert('☕ Break complete! Back to work!');
      }
      
    } catch (error) {
      console.log('Audio error:', error);
      // Fallback alert if audio fails
      if (type === 'break-start') {
        alert('✅ Work session complete! Time for a 5-minute break!');
      } else {
        alert('☕ Break complete! Back to work!');
      }
    }
    
    // Reset alarm playing state after 3 seconds
    setTimeout(() => setAlarmPlaying(false), 3000);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setCycles(0);
    setAlarmPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  if (!showTimer) {
    return (
      <button
        onClick={() => setShowTimer(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-accent-blue to-accent-purple 
                   text-white p-4 rounded-full shadow-lg hover:shadow-xl 
                   transform hover:scale-110 transition-all duration-300 z-50
                   animate-bounce-slow"
        title="Open Pomodoro Timer"
      >
        <FaClock className="text-2xl" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 glass-effect rounded-2xl shadow-2xl 
                    border border-dark-800 z-50 overflow-hidden
                    animate-slide-up">
      {/* Header */}
      <div className={`bg-gradient-to-r ${isBreak ? 'from-green-500 to-green-600' : 'from-accent-blue to-accent-purple'} p-4`}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            {isBreak ? <FaCoffee className="text-xl" /> : <FaBrain className="text-xl" />}
            {isBreak ? 'Break Time' : 'Focus Time'}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="text-white/80 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button
              onClick={() => setShowTimer(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="p-6 text-center">
        {/* Alarm indicator */}
        {alarmPlaying && (
          <div className="mb-2 text-sm text-yellow-500 animate-pulse">
            ⏰ Time's up! ⏰
          </div>
        )}

        {/* Progress Circle */}
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-dark-800"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
              className={`${isBreak ? 'text-green-500' : 'text-accent-blue'} transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {formatTime(minutes, seconds)}
            </span>
            <span className="text-sm text-gray-400 mt-1">
              {isBreak ? 'Break' : 'Focus'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={toggleTimer}
            className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110
                       ${isActive 
                         ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                         : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
          >
            {isActive ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-dark-800 rounded-full text-gray-400 
                     hover:text-white hover:bg-dark-700 transition-all duration-300 
                     transform hover:scale-110"
          >
            <FaRedo className="text-xl" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-400 border-t border-dark-800 pt-4">
          <div>
            <span className="block font-bold text-white">{cycles}</span>
            <span>Cycles</span>
          </div>
          <div>
            <span className="block font-bold text-white">
              {isBreak ? '5:00' : '25:00'}
            </span>
            <span>Duration</span>
          </div>
          <div>
            <span className="block font-bold text-green-500">
              {isBreak ? 'Break' : 'Focus'}
            </span>
            <span>Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;