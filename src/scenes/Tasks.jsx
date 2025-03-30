import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  CheckCircle,
  Circle,
  Trash2,
  Clock,
  Star,
  StarOff,
  Filter,
  Calendar,
  X,
} from "lucide-react";

const Tasks = () => {
  // Sample task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finalize dashboard design",
      completed: false,
      dueDate: "2025-04-05",
      priority: "high",
      category: "Design",
      starred: true,
    },
    {
      id: 2,
      title: "Create user flows for onboarding",
      completed: false,
      dueDate: "2025-04-02",
      priority: "medium",
      category: "UX",
      starred: false,
    },
    {
      id: 3,
      title: "Implement dark mode toggle",
      completed: true,
      dueDate: "2025-03-28",
      priority: "low",
      category: "Development",
      starred: false,
    },
    {
      id: 4,
      title: "Review analytics integration",
      completed: false,
      dueDate: "2025-04-10",
      priority: "high",
      category: "Development",
      starred: true,
    },
    {
      id: 5,
      title: "Update component library",
      completed: false,
      dueDate: "2025-04-15",
      priority: "medium",
      category: "Development",
      starred: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Priority colors
  const priorityColors = {
    low: "bg-green-400",
    medium: "bg-yellow-400",
    high: "bg-pink-500",
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Toggle star/favorite
  const toggleStar = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, starred: !task.starred } : task
      )
    );
  };

  // Delete task with animation
  const deleteTask = (id) => {
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== id));
      if (selectedTask && selectedTask.id === id) {
        setSelectedTask(null);
      }
    }, 300);
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        priority: "medium",
        category: "Design",
        starred: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setIsAddingTask(false);
    }
  };

  // Filter tasks
  const filteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "starred":
        return tasks.filter((task) => task.starred);
      default:
        return tasks;
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // CSS for task hover animation
  const taskHoverAnimation =
    "transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-pink-600/20";

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Header with animated gradient border bottom */}
      <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-pink-300"></div>
        <h1 className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300">
            Project Pulse
          </span>
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Task
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
              isFilterOpen
                ? "bg-pink-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Task list (main content) */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              <span className="text-pink-500">
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>{" "}
              Tasks
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">
                {filteredTasks().length} tasks
              </span>
              <span className="h-4 w-4 rounded-full bg-pink-500 flex items-center justify-center text-xs animate-pulse">
                {filteredTasks().filter((t) => !t.completed).length}
              </span>
            </div>
          </div>

          {/* New Task Input - with animation */}
          {isAddingTask && (
            <div className="bg-gray-800 rounded-xl p-4 flex items-center mb-4 animate-fadeIn border-l-4 border-pink-500 shadow-lg shadow-pink-900/20">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-gray-500"
                autoFocus
              />
              <button
                onClick={addTask}
                className="ml-2 px-4 py-1 bg-pink-600 rounded-lg text-white hover:bg-pink-700 transition-all"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingTask(false)}
                className="ml-2 px-3 py-1 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Task Cards - with enhanced animations */}
          <div className="space-y-3 pb-8">
            {filteredTasks().map((task, index) => (
              <div
                key={task.id}
                className={`bg-gray-800 rounded-xl p-4 ${taskHoverAnimation} ${
                  selectedTask && selectedTask.id === task.id
                    ? "border-l-4 border-pink-500"
                    : "border-l-4 border-transparent"
                }`}
                onClick={() => setSelectedTask(task)}
                style={{
                  opacity: 0,
                  animation: "fadeInUp 0.5s forwards",
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(task.id);
                      }}
                      className={`transition-all duration-300 transform ${
                        task.completed
                          ? "text-pink-500 scale-110"
                          : "text-gray-400 hover:text-pink-400 hover:scale-110"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        } transition-all duration-300`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center mt-2 text-xs text-gray-400 space-x-3">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            priorityColors[task.priority]
                          } text-gray-900 font-medium transition-all duration-300`}
                        >
                          {task.priority}
                        </span>
                        <span className="bg-gray-700 px-2 py-1 rounded-full transition-colors hover:bg-gray-600">
                          {task.category}
                        </span>
                        <span className="flex items-center bg-gray-700 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(task.id);
                      }}
                      className={`p-1 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 ${
                        task.starred ? "text-yellow-400" : "text-gray-500"
                      }`}
                    >
                      {task.starred ? (
                        <Star className="h-5 w-5" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="p-1 rounded-full hover:bg-gray-700 text-gray-500 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Progress indicator */}
                {!task.completed && (
                  <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-pink-300 h-1 rounded-full"
                      style={{
                        width: `${
                          task.completed
                            ? 100
                            : Math.max(
                                10,
                                Math.min(
                                  90,
                                  100 - getDaysRemaining(task.dueDate) * 10
                                )
                              )
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Task Details / Filter Panel (slides in from right) */}
        {selectedTask && (
          <div className="absolute inset-y-0 right-0 w-80 bg-black border-l border-gray-800 shadow-xl shadow-black/50 overflow-y-auto animate-slideInRight z-10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Task Details</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1 rounded-full hover:bg-gray-800 text-gray-400 transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {selectedTask.title}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        priorityColors[selectedTask.priority]
                      } text-gray-900 text-xs font-medium`}
                    >
                      {selectedTask.priority} priority
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:shadow-pink-900/20">
                    <div className="text-sm text-gray-400 mb-1">Category</div>
                    <div className="text-white">{selectedTask.category}</div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:shadow-pink-900/20">
                    <div className="text-sm text-gray-400 mb-1">Due Date</div>
                    <div className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-pink-400" />
                        {formatDate(selectedTask.dueDate)}
                      </span>
                      <span
                        className={`text-sm ${
                          getDaysRemaining(selectedTask.dueDate) < 0
                            ? "text-red-500"
                            : getDaysRemaining(selectedTask.dueDate) <= 2
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {getDaysRemaining(selectedTask.dueDate) < 0
                          ? "Overdue"
                          : getDaysRemaining(selectedTask.dueDate) === 0
                          ? "Due today"
                          : `${getDaysRemaining(
                              selectedTask.dueDate
                            )} days left`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:shadow-pink-900/20">
                    <div className="text-sm text-gray-400 mb-1">Status</div>
                    <div className="text-white flex items-center space-x-2">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          selectedTask.completed
                            ? "bg-green-500"
                            : "bg-pink-500"
                        } animate-pulse`}
                      ></span>
                      <span>
                        {selectedTask.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:shadow-pink-900/20">
                    <div className="text-sm text-gray-400 mb-3">
                      Description
                    </div>
                    <div className="text-gray-300 text-sm">
                      {selectedTask.description ||
                        "No description provided. Click to add one."}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-800">
                  <button
                    onClick={() => toggleComplete(selectedTask.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedTask.completed
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 hover:shadow-lg hover:shadow-pink-700/30"
                    }`}
                  >
                    {selectedTask.completed
                      ? "Mark as Incomplete"
                      : "Mark as Complete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Panel (Slide in from right when filter icon is clicked) */}
        {isFilterOpen && !selectedTask && (
          <div className="absolute inset-y-0 right-0 w-80 bg-black border-l border-gray-800 shadow-xl shadow-black/50 overflow-y-auto animate-slideInRight z-10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-pink-400">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-800 text-gray-400 transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    filter === "all"
                      ? "bg-pink-900/40 text-pink-300"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setFilter("all");
                    setIsFilterOpen(false);
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      filter === "all" ? "bg-pink-400" : "bg-gray-600"
                    } mr-3`}
                  ></span>
                  All Tasks
                </div>
                <div
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    filter === "pending"
                      ? "bg-pink-900/40 text-pink-300"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setFilter("pending");
                    setIsFilterOpen(false);
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      filter === "pending" ? "bg-pink-400" : "bg-gray-600"
                    } mr-3`}
                  ></span>
                  Pending
                </div>
                <div
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    filter === "completed"
                      ? "bg-pink-900/40 text-pink-300"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setFilter("completed");
                    setIsFilterOpen(false);
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      filter === "completed" ? "bg-pink-400" : "bg-gray-600"
                    } mr-3`}
                  ></span>
                  Completed
                </div>
                <div
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    filter === "starred"
                      ? "bg-pink-900/40 text-pink-300"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setFilter("starred");
                    setIsFilterOpen(false);
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      filter === "starred" ? "bg-pink-400" : "bg-gray-600"
                    } mr-3`}
                  ></span>
                  Starred
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Tasks;
