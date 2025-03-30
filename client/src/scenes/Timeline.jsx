import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users,
  Link,
  ChevronRight,
  ChevronDown,
  Award,
  Zap,
} from "lucide-react";

const ProjectPulseTimeline = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "UX Research",
      description: "Conduct user interviews and compile findings",
      startDate: "2025-04-05",
      endDate: "2025-04-15",
      status: "completed",
      dependencies: [],
      assignees: ["Alex", "Jordan"],
      completion: 100,
      critical: false,
      category: "Research",
    },
    {
      id: 2,
      title: "Wireframing",
      description: "Create low-fidelity wireframes for core features",
      startDate: "2025-04-16",
      endDate: "2025-04-25",
      status: "in-progress",
      dependencies: [1],
      assignees: ["Taylor"],
      completion: 65,
      critical: true,
      category: "Design",
    },
    {
      id: 3,
      title: "Visual Design",
      description: "Develop high-fidelity mockups based on wireframes",
      startDate: "2025-04-26",
      endDate: "2025-05-10",
      status: "not-started",
      dependencies: [2],
      assignees: ["Morgan", "Riley"],
      completion: 0,
      critical: true,
      category: "Design",
    },
    {
      id: 4,
      title: "Frontend Development",
      description: "Implement responsive UI components",
      startDate: "2025-05-11",
      endDate: "2025-05-30",
      status: "not-started",
      dependencies: [3],
      assignees: ["Casey"],
      completion: 0,
      critical: true,
      category: "Development",
    },
    {
      id: 5,
      title: "Testing",
      description: "Conduct user testing and fix issues",
      startDate: "2025-05-25",
      endDate: "2025-06-10",
      status: "not-started",
      dependencies: [4],
      assignees: ["Jamie", "Jordan"],
      completion: 0,
      critical: false,
      category: "QA",
    },
  ]);

  const timelineRef = useRef(null);
  const [activeTask, setActiveTask] = useState(null);
  const [showDependencies, setShowDependencies] = useState(true);
  const [hoverTask, setHoverTask] = useState(null);
  const [timelineView, setTimelineView] = useState("flowing"); // 'flowing' or 'cosmic'

  // Effect for the glowing animation
  useEffect(() => {
    const interval = setInterval(() => {
      const glowElements = document.querySelectorAll(".task-glow");
      glowElements.forEach((el) => {
        el.style.opacity = (Math.sin(Date.now() / 1000) + 1) / 4 + 0.25;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.status === "in-progress" && task.completion < 100) {
            const newCompletion = Math.min(task.completion + 1, 100);
            return { ...task, completion: newCompletion };
          }
          return task;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate days until deadline
  const getDaysUntilDeadline = (endDate) => {
    const today = new Date();
    const deadline = new Date(endDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Research":
        return "#9333ea"; // Purple
      case "Design":
        return "#ec4899"; // Pink
      case "Development":
        return "#0ea5e9"; // Blue
      case "QA":
        return "#22c55e"; // Green
      default:
        return "#f97316"; // Orange
    }
  };

  // Handle task click
  const handleTaskClick = (taskId) => {
    setActiveTask(activeTask === taskId ? null : taskId);
  };

  const handleTaskHover = (taskId) => {
    setHoverTask(taskId);
  };

  const CustomConnector = ({ isActive }) => (
    <div
      className={`connector-line relative w-px h-16 mx-auto ${
        isActive ? "bg-gradient-to-b from-pink-500 to-pink-700" : "bg-gray-800"
      }`}
    >
      {isActive && (
        <div className="absolute w-6 h-6 -left-3 top-1/2 -translate-y-1/2 rounded-full bg-black border-2 border-pink-500 task-glow"></div>
      )}
    </div>
  );

  const getTaskClasses = (task, isActive) => {
    let baseClasses =
      "task-card relative rounded-xl p-6 transition-all duration-500 backdrop-blur-sm";

    if (isActive) {
      baseClasses +=
        " border-2 border-pink-500 shadow-xl shadow-pink-500/20 z-20";
    } else if (task.critical) {
      baseClasses += " border border-pink-600/50";
    } else {
      baseClasses += " border border-gray-800";
    }

    // Add different styling based on status
    if (task.status === "completed") {
      baseClasses += " bg-gradient-to-br from-gray-900/90 to-gray-800/90";
    } else if (task.status === "in-progress") {
      baseClasses += " bg-gradient-to-br from-pink-900/40 to-black/90";
    } else {
      baseClasses += " bg-gradient-to-br from-gray-900/70 to-black/90";
    }

    // Add hover and pulse effects
    if (!isActive) {
      baseClasses +=
        " hover:scale-105 hover:shadow-lg hover:shadow-pink-500/10";
    } else {
      baseClasses += " scale-105";
    }

    return baseClasses;
  };

  const CosmicTimelineView = () => (
    <div className="py-12 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pink-600 to-transparent"></div>

      {tasks.map((task, index) => {
        const isActive = activeTask === task.id;
        const isLeft = index % 2 === 0;
        const daysLeft = getDaysUntilDeadline(task.endDate);

        return (
          <div key={task.id} className="mb-24 relative">
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 ${
                isLeft ? "right-1/2 mr-8" : "left-1/2 ml-8"
              } w-16 h-px bg-gradient-to-${
                isLeft ? "l" : "r"
              } from-transparent to-pink-600`}
            ></div>

            <div
              className={`absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${
                isActive ? "bg-pink-500" : "bg-gray-800"
              } z-10 ${isActive ? "task-glow" : ""}`}
            ></div>

            <div className={`grid grid-cols-2 gap-16 items-center relative`}>
              <div
                className={`${
                  isLeft ? "text-right col-start-1" : "col-start-2"
                }`}
              >
                <div
                  id={`task-${task.id}`}
                  className={getTaskClasses(task, isActive)}
                  onClick={() => handleTaskClick(task.id)}
                  onMouseEnter={() => handleTaskHover(task.id)}
                  onMouseLeave={() => setHoverTask(null)}
                >
                  {task.critical && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center z-10 task-glow">
                      <Zap size={12} className="text-white" />
                    </div>
                  )}

                  <div className="mb-2 flex items-center">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor: getCategoryColor(task.category),
                      }}
                    ></div>
                    <span className="text-xs text-gray-400">
                      {task.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {task.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {task.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar size={14} className="mr-1 text-pink-500" />
                      <span>
                        {new Date(task.startDate).toLocaleDateString()} -{" "}
                        {new Date(task.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-1 bg-gray-800 rounded-full mb-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-pink-600 to-pink-400"
                      style={{ width: `${task.completion}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-xs text-gray-400">
                        {task.assignees.join(", ")}
                      </span>
                    </div>

                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-xs ${
                        task.status === "completed"
                          ? "bg-green-900/50 text-green-400"
                          : task.status === "in-progress"
                          ? "bg-pink-900/50 text-pink-400"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {task.status === "completed" ? (
                        <>
                          <CheckCircle2 size={12} className="mr-1" />
                          <span>Completed</span>
                        </>
                      ) : task.status === "in-progress" ? (
                        <>
                          <Clock size={12} className="mr-1" />
                          <span>In Progress • {daysLeft} days left</span>
                        </>
                      ) : (
                        <>
                          <Calendar size={12} className="mr-1" />
                          <span>Upcoming</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expanding details section */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "max-h-48 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-800">
                      {task.dependencies.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center text-gray-400 mb-2 text-xs">
                            <Link size={12} className="mr-2 text-pink-500" />
                            <span>Dependencies</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {task.dependencies.map((depId) => {
                              const depTask = tasks.find((t) => t.id === depId);
                              return (
                                <div
                                  key={depId}
                                  className="flex items-center bg-gray-900 text-xs px-2 py-1 rounded border border-gray-800"
                                >
                                  <span>{depTask?.title}</span>
                                  <ChevronRight
                                    size={12}
                                    className="ml-1 text-pink-500"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty div for the other column */}
              <div
                className={`${isLeft ? "col-start-2" : "col-start-1"}`}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const FlowingTimelineView = () => (
    <div className="pt-12 relative" ref={timelineRef}>
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-pink-900/50 via-pink-600/50 to-pink-900/50"></div>

      {tasks.map((task, index) => {
        const isActive = activeTask === task.id;
        const isLastTask = index === tasks.length - 1;
        const daysLeft = getDaysUntilDeadline(task.endDate);

        return (
          <div
            key={task.id}
            className={`mb-6 ml-12 pl-16 relative ${isLastTask ? "" : "pb-8"}`}
          >
            {/* Timeline node */}
            <div className="absolute left-0 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-pink-500 bg-black z-10">
              {task.critical && (
                <div className="absolute w-full h-full rounded-full bg-pink-500 animate-ping opacity-50"></div>
              )}
            </div>

            {/* Connection line */}
            <div className="absolute left-0 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-pink-500 to-transparent top-3"></div>

            {/* Task card */}
            <div
              id={`task-${task.id}`}
              className={getTaskClasses(task, isActive)}
              onClick={() => handleTaskClick(task.id)}
              onMouseEnter={() => handleTaskHover(task.id)}
              onMouseLeave={() => setHoverTask(null)}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl z-0">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>
                {task.critical && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent task-glow"></div>
                )}
              </div>

              <div className="relative z-10">
                {/* Header with category */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor: getCategoryColor(task.category),
                      }}
                    ></div>
                    <span className="text-xs text-gray-400">
                      {task.category}
                    </span>
                  </div>

                  <div
                    className={`flex items-center px-3 py-1 rounded-full text-xs ${
                      task.status === "completed"
                        ? "bg-green-900/50 text-green-400"
                        : task.status === "in-progress"
                        ? "bg-pink-900/50 text-pink-400"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <>
                        <CheckCircle2 size={12} className="mr-1" />
                        <span>Completed</span>
                      </>
                    ) : task.status === "in-progress" ? (
                      <>
                        <Clock size={12} className="mr-1" />
                        <span>In Progress</span>
                      </>
                    ) : (
                      <>
                        <Calendar size={12} className="mr-1" />
                        <span>Upcoming</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-bold text-white mb-1 flex items-center">
                  {task.title}
                  {task.critical && (
                    <Zap size={16} className="ml-2 text-pink-500" />
                  )}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{task.description}</p>

                {/* Timeline info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar size={14} className="mr-1 text-pink-500" />
                    <span>
                      {new Date(task.startDate).toLocaleDateString()} -{" "}
                      {new Date(task.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  {daysLeft > 0 && task.status !== "completed" && (
                    <span
                      className={`text-xs ${
                        daysLeft < 7 ? "text-pink-400" : "text-gray-400"
                      }`}
                    >
                      {daysLeft} days left
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${task.completion}%`,
                      background: `linear-gradient(to right, ${getCategoryColor(
                        task.category
                      )}, #ec4899)`,
                    }}
                  ></div>
                </div>

                {/* Bottom row with assignees */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {task.assignees.slice(0, 3).map((assignee, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs"
                        >
                          {assignee.charAt(0)}
                        </div>
                      ))}
                      {task.assignees.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs">
                          +{task.assignees.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {task.assignees.length > 0
                        ? task.assignees.join(", ")
                        : "Unassigned"}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400">
                    {task.completion}% Complete
                  </div>
                </div>

                {/* Expandable details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isActive ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-gray-800">
                    {task.dependencies.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center text-gray-400 mb-2 text-xs">
                          <Link size={12} className="mr-2 text-pink-500" />
                          <span>Dependencies</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {task.dependencies.map((depId) => {
                            const depTask = tasks.find((t) => t.id === depId);
                            return (
                              <div
                                key={depId}
                                className="flex items-center bg-gray-900 text-xs px-2 py-1 rounded border border-gray-800"
                              >
                                <span>{depTask?.title}</span>
                                <ChevronRight
                                  size={12}
                                  className="ml-1 text-pink-500"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center">
              Project{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300 ml-2">
                Pulse
              </span>
            </h1>
            <p className="text-gray-400 mt-1">Timeline visualization</p>
          </div>

          <div className="flex space-x-4">
            {/* View toggle */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-1 flex">
              <button
                onClick={() => setTimelineView("flowing")}
                className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                  timelineView === "flowing"
                    ? "bg-pink-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>Flowing</span>
              </button>
              <button
                onClick={() => setTimelineView("cosmic")}
                className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                  timelineView === "cosmic"
                    ? "bg-pink-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>Cosmic</span>
              </button>
            </div>

            {/* Dependencies toggle */}
            {/* <button
              onClick={() => setShowDependencies(!showDependencies)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                showDependencies
                  ? "bg-pink-700 text-white"
                  : "bg-gray-900/50 backdrop-blur-sm text-gray-400 hover:text-white"
              }`}
            >
              <Link size={16} />
              <span>Dependencies</span>
            </button> */}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Total Tasks",
              value: tasks.length,
              icon: <CheckCircle2 size={18} className="text-pink-500" />,
            },
            {
              label: "In Progress",
              value: tasks.filter((t) => t.status === "in-progress").length,
              icon: <Clock size={18} className="text-pink-500" />,
            },
            {
              label: "Critical Tasks",
              value: tasks.filter((t) => t.critical).length,
              icon: <AlertCircle size={18} className="text-pink-500" />,
            },
            {
              label: "Project Progress",
              value: `${Math.round(
                tasks.reduce((acc, task) => acc + task.completion, 0) /
                  tasks.length
              )}%`,
              icon: <Award size={18} className="text-pink-500" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl p-4 border border-gray-800 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold mt-2 text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Timeline visualization */}
        <div className="bg-gradient-to-br from-gray-900/70 to-black/70 rounded-xl border border-gray-800 backdrop-blur-sm p-6">
          {timelineView === "flowing" ? (
            <FlowingTimelineView />
          ) : (
            <CosmicTimelineView />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPulseTimeline;
