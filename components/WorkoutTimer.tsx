import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const WorkoutTimer = () => {
  const exercises = useMemo(() => [
    { name: "热身准备", duration: 5, description: "准备开始运动", color: "from-blue-400 to-blue-600" },
    { name: "开合跳", duration: 30, description: "双脚跳起同时双手上举", color: "from-purple-400 to-purple-600" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸", color: "from-green-400 to-green-600" },
    { name: "俯卧撑", duration: 30, description: "保持身体平直，缓慢上下", color: "from-pink-400 to-pink-600" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸", color: "from-green-400 to-green-600" },
    { name: "深蹲", duration: 30, description: "背部挺直，膝盖不超过脚尖", color: "from-orange-400 to-orange-600" }
  ], []);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentExerciseIndex < exercises.length - 1) {
      playSound();
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentExerciseIndex, exercises]);

  const playSound = () => {
    if (isSoundEnabled) {
      const audio = new Audio('data:audio/wav;base64,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');
      audio.play().catch(() => {
        console.log('Sound play failed');
      });
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning && timeLeft === exercises[currentExerciseIndex].duration) {
      playSound();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(exercises[0].duration);
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const progress = (exercises[currentExerciseIndex].duration - timeLeft) / exercises[currentExerciseIndex].duration * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-md mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className={`p-6 rounded-xl bg-gradient-to-r ${exercises[currentExerciseIndex].color} shadow-lg transform transition-all duration-500`}>
              <h2 className="text-3xl font-bold text-white">
                {exercises[currentExerciseIndex].name}
              </h2>
              <p className="text-xl text-white/90 mt-2">
                {exercises[currentExerciseIndex].description}
              </p>
              <div className="text-7xl font-bold text-white mt-4 font-mono">
                {timeLeft}
              </div>
            </div>

            <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`absolute h-full bg-gradient-to-r ${exercises[currentExerciseIndex].color} transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className={`p-6 rounded-full ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg`}
            >
              {isRunning ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-6 rounded-full bg-gray-600 hover:bg-gray-700 text-white transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <RotateCcw size={32} />
            </button>
            <button
              onClick={toggleSound}
              className="p-6 rounded-full bg-gray-600 hover:bg-gray-700 text-white transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              {isSoundEnabled ? <Volume2 size={32} /> : <VolumeX size={32} />}
            </button>
          </div>

          <div className="text-white text-center space-y-2">
            <div className="text-lg font-medium">
              进度: {currentExerciseIndex + 1} / {exercises.length}
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${(currentExerciseIndex + 1) / exercises.length * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;