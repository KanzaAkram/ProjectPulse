import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";

const ProjectOverview = () => {
  // Animation states
  const [loaded, setLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activePulse, setActivePulse] = useState(null);

  // Project stats
  const projectStats = {
    progress: 68,
    tasks: {
      total: 43,
      completed: 18,
      atRisk: 3,
    },
    nextDeadline: "April 2, 2025",
  };

  // Task categories with unique shapes and animations
  const taskCategories = [
    {
      id: "design",
      name: "Design",
      progress: 75,
      tasks: 12,
      color: "#ff1a75",
      shape: "hexagon",
      pulseColor: "rgba(255, 26, 117, 0.3)",
    },
    {
      id: "development",
      name: "Development",
      progress: 45,
      tasks: 18,
      color: "#ff85a2",
      shape: "rectangle",
      pulseColor: "rgba(255, 133, 162, 0.3)",
    },
    {
      id: "marketing",
      name: "Marketing",
      progress: 90,
      tasks: 8,
      color: "#f21368",
      shape: "circle",
      pulseColor: "rgba(242, 19, 104, 0.3)",
    },
    // {
    //   id: "research",
    //   name: "Research",
    //   progress: 30,
    //   tasks: 5,
    //   color: "#ff4d8d",
    //   shape: "triangle",
    //   pulseColor: "rgba(255, 77, 141, 0.3)",
    // },
  ];

  // Task flow data for the dynamic flow visualization
  const taskFlowData = [
    { name: "Ideation", value: 8, color: "#f02e7e" },
    { name: "Planning", value: 12, color: "#ff1a75" },
    { name: "Execution", value: 15, color: "#ff4d8d" },
    { name: "Review", value: 5, color: "#ff85a2" },
    { name: "Deployment", value: 3, color: "#ff99c8" },
  ];

  // Team activity data for the glowing pulse chart
  const activityData = [
    { time: "9AM", value: 20 },
    { time: "10AM", value: 35 },
    { time: "11AM", value: 40 },
    { time: "12PM", value: 25 },
    { time: "1PM", value: 15 },
    { time: "2PM", value: 45 },
    { time: "3PM", value: 50 },
    { time: "4PM", value: 30 },
    { time: "5PM", value: 20 },
  ];

  // Animation effect on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    // Set up the automatic pulse animation
    let currentIndex = 0;
    const pulseInterval = setInterval(() => {
      setActivePulse(taskCategories[currentIndex].id);
      currentIndex = (currentIndex + 1) % taskCategories.length;

      setTimeout(() => {
        setActivePulse(null);
      }, 2000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  // Custom shape components for the task category visualization
  const ShapeComponent = ({ category, isActive, isPulsing }) => {
    switch (category.shape) {
      case "hexagon":
        return (
          <div className={`relative ${isPulsing ? "animate-pulse" : ""}`}>
            <div
              className={`w-32 h-32 bg-black border-2 transition-all duration-500 rotate-45 overflow-hidden ${isActive ? `border-${category.color} shadow-lg shadow-${category.color}` : "border-gray-700"}`}
            >
              <div className="-rotate-45 w-full h-full flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{category.progress}%</span>
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
            </div>
            {isPulsing && (
              <div
                className="absolute inset-0 w-32 h-32 rotate-45 animate-ping opacity-20"
                style={{ backgroundColor: category.pulseColor }}
              ></div>
            )}
          </div>
        );
      case "rectangle":
        return (
          <div className="relative">
            <div
              className={`w-32 h-32 bg-black border-2 transition-all duration-500 rounded-sm overflow-hidden ${isActive ? `border-${category.color} shadow-lg shadow-${category.color}` : "border-gray-700"}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{category.progress}%</span>
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
            </div>
            {isPulsing && (
              <div
                className="absolute inset-0 w-32 h-32 rounded-sm animate-ping opacity-20"
                style={{ backgroundColor: category.pulseColor }}
              ></div>
            )}
          </div>
        );
      case "circle":
        return (
          <div className="relative">
            <div
              className={`w-32 h-32 bg-black border-2 transition-all duration-500 rounded-full overflow-hidden ${isActive ? `border-${category.color} shadow-lg shadow-${category.color}` : "border-gray-700"}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{category.progress}%</span>
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
            </div>
            {isPulsing && (
              <div
                className="absolute inset-0 w-32 h-32 rounded-full animate-ping opacity-20"
                style={{ backgroundColor: category.pulseColor }}
              ></div>
            )}
          </div>
        );
      case "triangle":
        return (
          <div className="relative flex items-center justify-center h-32">
            <div
              className={`w-0 h-0 transition-all duration-500 overflow-visible
              border-l-[55px] border-r-[55px] border-b-[110px]
              ${isActive ? "border-l-transparent border-r-transparent" : "border-l-gray-700 border-r-gray-700 border-b-gray-700"}`}
            >
              <div className="absolute -left-12 -bottom-8 w-24 flex flex-col items-center">
                <span className="text-xl font-bold">{category.progress}%</span>
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
            </div>
            {isActive && (
              <div
                className={`absolute w-0 h-0 border-l-[55px] border-r-[55px] border-b-[110px] 
                border-l-transparent border-r-transparent shadow-lg`}
                style={{
                  borderBottomColor: category.color,
                  filter: `drop-shadow(0 0 10px ${category.color})`,
                }}
              ></div>
            )}
            {isPulsing && (
              <div
                className="absolute w-0 h-0 
                border-l-[55px] border-r-[55px] border-b-[110px]
                border-l-transparent border-r-transparent animate-ping opacity-20"
                style={{ borderBottomColor: category.pulseColor }}
              ></div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Progress circle component with animation
  const ProgressCircle = ({
    progress,
    size = 220,
    strokeWidth = 12,
    color = "#ff4d8d",
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            stroke="#333"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={loaded ? offset : circumference}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white">
            {loaded ? progress : 0}%
          </span>
          <span className="text-gray-400">Overall Progress</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Dynamic background with animated gradient */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-pink-900/10 to-transparent"></div>
        <div className="absolute w-1/3 h-1/3 rounded-full bg-pink-500/5 blur-3xl top-1/4 -left-20 animate-blob"></div>
        <div className="absolute w-1/3 h-1/3 rounded-full bg-purple-500/5 blur-3xl bottom-1/4 right-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute w-1/4 h-1/4 rounded-full bg-pink-500/5 blur-3xl bottom-1/3 left-1/3 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header with animated text */}
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl font-bold mb-1 flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300">
              PROJECT PULSE
            </span>
            <div className="ml-3 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
          </h1>
          <p className="text-gray-400 mb-8">
            Interactive visualization of your project's heartbeat
          </p>
        </div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Progress overview */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-6 text-pink-300">
                Project Vitals
              </h2>

              {/* Main progress circle */}
              <div className="mx-auto mb-8">
                <ProgressCircle progress={projectStats.progress} />
              </div>

              {/* Key stats with animated icons */}
              <div className="space-y-6 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500/10 text-pink-500">
                      <CheckCircle
                        size={20}
                        className={loaded ? "animate-bounce-once" : ""}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm">Completed Tasks</p>
                      <p className="text-xl font-semibold">
                        {projectStats.tasks.completed}/
                        {projectStats.tasks.total}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (projectStats.tasks.completed /
                        projectStats.tasks.total) *
                        100
                    )}
                    %
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500/10 text-pink-500">
                      <AlertTriangle
                        size={20}
                        className={
                          loaded
                            ? "animate-bounce-once animation-delay-200"
                            : ""
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm">At Risk</p>
                      <p className="text-xl font-semibold">
                        {projectStats.tasks.atRisk} Tasks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500/10 text-pink-500">
                      <Clock
                        size={20}
                        className={
                          loaded
                            ? "animate-bounce-once animation-delay-400"
                            : ""
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm">Next Deadline</p>
                      <p className="text-xl font-semibold">
                        {projectStats.nextDeadline}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium px-3 py-1 bg-pink-500/20 rounded-full text-pink-300">
                    3 days left
                  </div>
                </div>
              </div>

              {/* Quick action button */}
              <button className="mt-8 w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl font-bold text-white flex items-center justify-center group hover:from-pink-500 hover:to-pink-600 transition-all duration-300">
                <span>View Critical Path</span>
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Middle column - Task categories visualization */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-pink-300">Focus Areas</h2>
                <div className="text-sm bg-pink-500/10 px-3 py-1 rounded-full">
                  <span className="text-pink-300">Pulse View</span>
                </div>
              </div>

              {/* Custom shape visualization for task categories */}
              <div className="flex flex-wrap justify-center gap-10 mb-8">
                {taskCategories.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveCard(category.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <ShapeComponent
                      category={category}
                      isActive={activeCard === category.id}
                      isPulsing={activePulse === category.id}
                    />
                  </div>
                ))}
              </div>

              {/* Dynamic task flow visualization */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold mb-4 text-pink-200">
                  Task Flow
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskFlowData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {taskFlowData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className={
                              loaded
                                ? "animate-glow-once animation-delay-" +
                                  index * 200
                                : ""
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend for task flow */}
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {taskFlowData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-400 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team activity pulse line */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-pink-200">
                    Team Activity
                  </h3>
                  <div className="flex items-center text-pink-300">
                    <Zap size={16} className="mr-1" />
                    <span className="text-sm">Live Updates</span>
                  </div>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <defs>
                        <linearGradient
                          id="colorActivity"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ff4d8d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ff4d8d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ff4d8d"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 8, className: "animate-ping-slow" }}
                        className={loaded ? "animate-draw-line" : ""}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Visual project timeline */}
        <div
          className={`mt-8 transition-all duration-1000 delay-900 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-pink-300">
                Project Momentum
              </h2>
              <div className="flex items-center">
                <Target size={18} className="text-pink-500 mr-2" />
                <span className="text-pink-200">68% to goal</span>
              </div>
            </div>

            {/* Visual timeline with animated milestones */}
            <div className="relative">
              {/* Timeline track */}
              <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full transition-all duration-1000"
                  style={{ width: loaded ? "68%" : "0%" }}
                ></div>
              </div>

              {/* Milestone points */}
              <div className="flex justify-between relative h-16">
                {[0, 25, 50, 75, 100].map((milestone, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center relative"
                  >
                    <div
                      className={`w-6 h-6 rounded-full z-10 ${milestone <= projectStats.progress ? "bg-pink-500" : "bg-gray-700"} 
                      ${loaded && milestone <= projectStats.progress ? "animate-pulse-once animation-delay-" + index * 200 : ""}`}
                    ></div>
                    <div className="absolute top-8 text-sm font-medium">
                      <span
                        className={
                          milestone <= projectStats.progress
                            ? "text-pink-300"
                            : "text-gray-500"
                        }
                      >
                        {milestone}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key achievements */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                "Project Start",
                "Requirements",
                "Development",
                "Testing & Delivery",
              ].map((phase, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${index <= 2 ? "bg-pink-500/20 text-pink-200" : "bg-gray-800 text-gray-400"}`}
                >
                  {phase}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for custom animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes draw-line {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        @keyframes bounce-once {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes glow-once {
          0% {
            filter: drop-shadow(0 0 0px #ff4d8d);
          }
          50% {
            filter: drop-shadow(0 0 8px #ff4d8d);
          }
          100% {
            filter: drop-shadow(0 0 0px #ff4d8d);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          70%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-once {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 77, 141, 0.7);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(255, 77, 141, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 77, 141, 0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite alternate;
        }

        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
        }

        .animate-bounce-once {
          animation: bounce-once 1s;
        }

        .animate-glow-once {
          animation: glow-once 2s;
        }

        .animate-ping-slow {
          animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-once {
          animation: pulse-once 2s;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ProjectOverview;
