import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const WorkoutTimer = () => {
  const exercises = useMemo(() => [
    { name: "热身准备", duration: 5, description: "准备开始运动" },
    { name: "开合跳", duration: 30, description: "双脚跳起同时双手上举" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "俯卧撑", duration: 30, description: "保持身体平直，缓慢上下" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "深蹲", duration: 30, description: "背部挺直，膝盖不超过脚尖" }
  ], []);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentExerciseIndex, exercises]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(exercises[0].duration);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {exercises[currentExerciseIndex].name}
          </h2>
          <p className="text-xl text-gray-600">
            {exercises[currentExerciseIndex].description}
          </p>
          <div className="text-6xl font-bold text-blue-500">
            {timeLeft}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            {isRunning ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 transition-colors"
          >
            <RotateCcw size={32} />
          </button>
        </div>

        <div className="text-sm text-gray-500 text-center">
          进度: {currentExerciseIndex + 1} / {exercises.length}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;