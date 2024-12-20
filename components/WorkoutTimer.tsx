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
      try {
        const audio = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA=");
        audio.play();
      } catch (error) {
        console.log('Sound play failed', error);
      }
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