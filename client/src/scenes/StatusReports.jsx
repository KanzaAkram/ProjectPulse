import { useState, useEffect } from "react";
import {
  BarChart,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

const StatusReports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setReports([
        {
          id: 1,
          title: "Frontend Development",
          completion: 78,
          status: "On Track",
          lastUpdated: "Today, 2:30 PM",
          owner: "Alex Morgan",
          priority: "High",
          details:
            "Completed responsive layout implementation. Working on animations and transitions.",
        },
        {
          id: 2,
          title: "Backend API Integration",
          completion: 65,
          status: "At Risk",
          lastUpdated: "Yesterday, 10:15 AM",
          owner: "Jamie Chen",
          priority: "Critical",
          details:
            "Authentication issues resolved. Facing challenges with data synchronization.",
        },
        {
          id: 3,
          title: "User Testing",
          completion: 42,
          status: "Behind",
          lastUpdated: "Mar 28, 2:45 PM",
          owner: "Taylor Kim",
          priority: "Medium",
          details:
            "5 of 12 test scenarios completed. Need more participants for usability testing.",
        },
        {
          id: 4,
          title: "Documentation",
          completion: 90,
          status: "Completed",
          lastUpdated: "Mar 27, 9:00 AM",
          owner: "Jordan Lee",
          priority: "Low",
          details: "User guide completed. API documentation in final review.",
        },
      ]);
      setLoading(false);
      setAnimateIn(true);
    }, 1000);
  }, []);

  // Status color mapping
  const getStatusColor = (status) => {
    const statusMap = {
      "On Track": "bg-green-500",
      "At Risk": "bg-yellow-500",
      Behind: "bg-red-500",
      Completed: "bg-blue-500",
    };
    return statusMap[status] || "bg-gray-500";
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    const priorityMap = {
      Low: "bg-gray-400",
      Medium: "bg-blue-400",
      High: "bg-pink-500",
      Critical: "bg-red-500",
    };
    return priorityMap[priority] || "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with pulse animation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black p-6 border-b border-pink-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Activity className="h-8 w-8 text-pink-500" />
              <div className="absolute -inset-1 bg-pink-500 rounded-full opacity-30 animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-pink-500">Project</span> Pulse
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-pink-600 rounded-md transition-all hover:bg-pink-700">
              New Report
            </button>
            <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
              <Calendar className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab("daily")}
              className={`px-6 py-4 transition-all flex items-center space-x-2 ${
                activeTab === "daily"
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Daily Updates</span>
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`px-6 py-4 transition-all flex items-center space-x-2 ${
                activeTab === "weekly"
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BarChart className="h-4 w-4" />
              <span>Weekly Progress</span>
            </button>
            <button
              onClick={() => setActiveTab("milestones")}
              className={`px-6 py-4 transition-all flex items-center space-x-2 ${
                activeTab === "milestones"
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Milestones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-pink-500 opacity-75 animate-ping"></div>
              <p className="mt-4 text-pink-500">Loading status reports...</p>
            </div>
          </div>
        ) : (
          <div
            className={`transition-all duration-700 transform ${
              animateIn
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-pink-500 mr-2">
                    {activeTab === "daily"
                      ? "Daily"
                      : activeTab === "weekly"
                      ? "Weekly"
                      : "Milestone"}
                  </span>
                  Status Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-pink-500">
                    <p className="text-gray-400">Projects</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-green-500 text-sm">+2 this week</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-400">On Track</p>
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-green-500 text-sm">58% of total</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-gray-400">At Risk</p>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-yellow-500 text-sm">25% of total</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-gray-400">Behind</p>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-red-500 text-sm">17% of total</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Recent Status Reports
            </h3>

            <div className="space-y-4">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`h-3 w-3 rounded-full ${getStatusColor(
                            report.status
                          )}`}
                        ></span>
                        <h3 className="text-lg font-semibold">
                          {report.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                            report.priority
                          )}`}
                        >
                          {report.priority}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm mt-2 md:mt-0">
                        Updated: {report.lastUpdated}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Progress</span>
                        <span className="text-pink-500">
                          {report.completion}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${report.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{report.details}</p>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                      <div className="text-sm text-gray-400">
                        Owner:{" "}
                        <span className="text-white">{report.owner}</span>
                      </div>
                      <button className="text-pink-500 hover:text-pink-400 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusReports;
