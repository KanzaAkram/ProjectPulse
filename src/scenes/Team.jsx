import React, { useState, useEffect } from "react";
import {
  Users,
  ChevronRight,
  XCircle,
  Clock,
  CheckCircle,
  Briefcase,
  BarChart2,
  PlusCircle,
  Search,
} from "lucide-react";

export default function TeamDashboard() {
  // Sample data - would be fetched from API in real application
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Morgan",
      role: "UX Designer",
      avatar: "/api/placeholder/40/40",
      workload: 80,
      tasks: 12,
      status: "online",
      projects: [
        { id: 1, name: "Homepage Redesign", progress: 75, priority: "high" },
        { id: 2, name: "Mobile App", progress: 30, priority: "medium" },
      ],
    },
    {
      id: 2,
      name: "Jamie Chen",
      role: "Frontend Developer",
      avatar: "/api/placeholder/40/40",
      workload: 65,
      tasks: 8,
      status: "offline",
      projects: [
        { id: 3, name: "Dashboard", progress: 90, priority: "high" },
        { id: 4, name: "API Integration", progress: 20, priority: "low" },
      ],
    },
    {
      id: 3,
      name: "Taylor Kim",
      role: "Project Manager",
      avatar: "/api/placeholder/40/40",
      workload: 45,
      tasks: 5,
      status: "online",
      projects: [
        { id: 5, name: "Client Meeting", progress: 10, priority: "medium" },
        { id: 6, name: "Resource Planning", progress: 60, priority: "medium" },
      ],
    },
    {
      id: 4,
      name: "Jordan Smith",
      role: "Backend Developer",
      avatar: "/api/placeholder/40/40",
      workload: 90,
      tasks: 15,
      status: "busy",
      projects: [
        { id: 7, name: "Database Migration", progress: 45, priority: "high" },
        { id: 8, name: "Security Audit", progress: 80, priority: "high" },
      ],
    },
  ]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompactView, setIsCompactView] = useState(false);

  // Animation states
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);

    // Simulate data updates
    const interval = setInterval(() => {
      setTeamMembers((prevMembers) =>
        prevMembers.map((member) => ({
          ...member,
          workload: Math.min(
            100,
            Math.max(20, member.workload + (Math.random() * 10 - 5))
          ),
          projects: member.projects.map((project) => ({
            ...project,
            progress: Math.min(
              100,
              Math.max(0, project.progress + (Math.random() * 3 - 1))
            ),
          })),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getWorkloadColor = (workload) => {
    if (workload >= 80) return "bg-red-500";
    if (workload >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-500";
    if (priority === "medium") return "bg-yellow-500";
    return "bg-blue-500";
  };

  const handleSelectMember = (member) => {
    setSelectedMember(selectedMember?.id === member.id ? null : member);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">
            <span className="text-pink-500">Pulse</span> Team
          </h1>
          <div
            className={`flex items-center bg-gray-800 rounded-lg py-1 px-3 transition-all duration-500 ${
              animate ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <Users size={16} className="text-pink-500 mr-2" />
            <span className="text-sm">{teamMembers.length} Members</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-all">
            <Search size={18} className="text-gray-400" />
          </button>
          <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-all">
            <PlusCircle size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Filters */}
        <div
          className={`lg:col-span-1 transition-all duration-700 ${
            animate ? "opacity-100" : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="bg-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-medium mb-4">Filters</h2>

            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Search name or role"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                    onClick={() => setSearchTerm("")}
                  >
                    <XCircle size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filterStatus === "all"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filterStatus === "online"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterStatus("online")}
                >
                  Online
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filterStatus === "busy"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterStatus("busy")}
                >
                  Busy
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filterStatus === "offline"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterStatus("offline")}
                >
                  Offline
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">View</label>
              <div className="flex space-x-2">
                <button
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    !isCompactView
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setIsCompactView(false)}
                >
                  Detailed
                </button>
                <button
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    isCompactView
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setIsCompactView(true)}
                >
                  Compact
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-medium mb-4">Team Workload</h2>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{member.name}</span>
                    <span className="text-sm font-medium text-pink-500">
                      {Math.round(member.workload)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getWorkloadColor(
                        member.workload
                      )} transition-all duration-1000 group-hover:opacity-80`}
                      style={{ width: `${member.workload}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div
          className={`lg:col-span-4 transition-all duration-1000 ${
            animate ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-medium mb-4">Team Members</h2>

            <div className="space-y-4">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No team members match your filters
                </div>
              ) : (
                filteredMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`bg-gray-750 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-pink-900/20 ${
                      animate
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`p-4 cursor-pointer transition-all ${
                        selectedMember?.id === member.id
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => handleSelectMember(member)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center uppercase border-2 border-gray-700">
                              {member.name.charAt(0)}
                            </div>
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                                member.status === "online"
                                  ? "bg-green-500"
                                  : member.status === "busy"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                              }`}
                            ></div>
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-400">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        {!isCompactView && (
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-sm text-gray-400">
                                Workload
                              </div>
                              <div className="text-lg font-semibold">
                                <span
                                  className={
                                    member.workload >= 80
                                      ? "text-red-500"
                                      : member.workload >= 60
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                  }
                                >
                                  {Math.round(member.workload)}%
                                </span>
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-sm text-gray-400">Tasks</div>
                              <div className="text-lg font-semibold">
                                {member.tasks}
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-sm text-gray-400">
                                Projects
                              </div>
                              <div className="text-lg font-semibold">
                                {member.projects.length}
                              </div>
                            </div>
                          </div>
                        )}

                        <ChevronRight
                          size={20}
                          className={`text-gray-400 transition-transform ${
                            selectedMember?.id === member.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {selectedMember?.id === member.id && (
                      <div className="px-4 py-3 bg-gray-700 border-t border-gray-600 animate-fadeIn">
                        <h4 className="font-medium text-sm text-pink-400 mb-3">
                          Assigned Projects
                        </h4>
                        <div className="space-y-4">
                          {member.projects.map((project) => (
                            <div
                              key={project.id}
                              className="bg-gray-800 rounded-lg p-3"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h5 className="font-medium">
                                    {project.name}
                                  </h5>
                                  <div className="flex items-center mt-1">
                                    <Clock
                                      size={14}
                                      className="text-gray-400 mr-1"
                                    />
                                    <span className="text-xs text-gray-400">
                                      Due in 5 days
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                                    project.priority
                                  )}`}
                                >
                                  {project.priority.charAt(0).toUpperCase() +
                                    project.priority.slice(1)}
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs text-gray-400">
                                    Progress
                                  </span>
                                  <span className="text-xs font-medium">
                                    {Math.round(project.progress)}%
                                  </span>
                                </div>
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-pink-500 transition-all duration-700"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (simulated) */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-around transition-all duration-700 ${
          animate ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-pink-500 relative">
          <Users size={20} />
          <span className="text-xs mt-1">Team</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
          <Briefcase size={20} />
          <span className="text-xs mt-1">Projects</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
          <CheckCircle size={20} />
          <span className="text-xs mt-1">Tasks</span>
        </button>
      </div>

      <style jsx>{`
        /* Animation classes */
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom background */
        .bg-gray-750 {
          background-color: #2d2d3a;
        }
      `}</style>
    </div>
  );
}
