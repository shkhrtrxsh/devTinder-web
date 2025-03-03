import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnections(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to load connections");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  const handleRemoveConnection = async (connectionId) => {
    try {
      await axios.delete(`${BASE_URL}/connections/${connectionId}`, {
        withCredentials: true,
      });
      toast.success("Connection removed successfully");
      // Refresh connections list
      fetchConnections();
    } catch (error) {
      console.error("Error removing connection:", error);
      toast.error("Failed to remove connection");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Connections</h1>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Connections</div>
              <div className="stat-value text-primary">
                {connections.length}
              </div>
            </div>
          </div>
        </div>

        {connections.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl mb-4">No Connections Yet</h2>
              <p className="text-base-content/70">
                Start connecting with other developers to grow your network!
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary">Find Developers</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={connection.photoUrl}
                          alt={connection.name}
                          //   onError={(e) => {
                          //     e.target.src = "https://placeholder.com/150";
                          //   }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="card-title">
                        {connection.name}
                        <div className="badge badge-secondary ml-2">
                          {connection.age}
                        </div>
                      </h2>
                      <p className="text-sm text-base-content/70 mt-1">
                        {connection.gender}
                      </p>
                    </div>
                  </div>

                  {connection.skills?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {connection.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="badge badge-outline badge-sm"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {connection.about && (
                    <p className="mt-4 text-sm line-clamp-2">
                      {connection.about}
                    </p>
                  )}

                  <div className="card-actions justify-between items-center mt-6">
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-info btn-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        Message
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleRemoveConnection(connection._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                    <div className="badge badge-ghost">
                      Connected {connection.connectedSince || "Recently"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
