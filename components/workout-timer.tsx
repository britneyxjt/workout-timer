import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WorkoutTimer = () => {
  const exercises = [
    { name: "热身准备", duration: 5, description: "准备开始运动" },
    { name: "开合跳", duration: 30, description: "双脚跳起同时双手上举" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "俯卧撑", duration: 30, description: "保持身体平直，缓慢上下" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "深蹲", duration: 30, description: "背部挺直，膝盖不超过脚尖" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "平板支撑", duration: 30, description: "保持身体成一条直线" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "弓步蹲", duration: 30, description: "左右腿交替，保持平衡" },
    { name: "休息", duration: 5, description: "短暂休息，调整呼吸" },
    { name: "仰卧起坐", duration: 30, description: "注意保护颈部" },
    { name: "完成", duration: 5, description: "恭喜完成全部运动！" }
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentExerciseIndex]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(exercises[0].duration);
  };

  const progress = (exercises[currentExerciseIndex].duration - timeLeft) / exercises[currentExerciseIndex].duration * 100;

  return (
    <Card className="w-full max-w-lg mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          {exercises[currentExerciseIndex].name}
        </h2>
        <p className="text-lg">
          {exercises[currentExerciseIndex].description}
        </p>
        <div className="text-4xl font-bold">
          {timeLeft}秒
        </div>
      </div>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="text-sm text-gray-500">
        进度: {currentExerciseIndex + 1} / {exercises.length}
      </div>
    </Card>
  );
};

export default WorkoutTimer;
