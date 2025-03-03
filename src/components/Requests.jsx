import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.requests));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Connection request accepted!");
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Connection request rejected");
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
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
          <h1 className="text-3xl font-bold">Connection Requests</h1>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Pending Requests</div>
              <div className="stat-value text-primary">{requests.length}</div>
            </div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl mb-4">No Pending Requests</h2>
              <p className="text-base-content/70">
                You don't have any connection requests at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request.fromUserId._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={request.fromUserId.photoUrl}
                          alt={request.fromUserId.firstName}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="card-title">
                        {request.fromUserId.firstName}{" "}
                        {request.fromUserId.lastName}
                        <div className="badge badge-secondary ml-2">
                          {request.fromUserId.age}
                        </div>
                      </h2>
                      <p className="text-sm text-base-content/70 mt-1">
                        {request.fromUserId.gender}
                      </p>
                    </div>
                  </div>

                  {request.fromUserId.skills?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {request.fromUserId.skills.map((skill, index) => (
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

                  {request.fromUserId.about && (
                    <p className="mt-4 text-sm line-clamp-2">
                      {request.fromUserId.about}
                    </p>
                  )}

                  <div className="card-actions flex-col gap-4 mt-6">
                    <div className="flex justify-between w-full">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAcceptRequest(request._id)}
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleRejectRequest(request._id)}
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Reject
                      </button>
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

export default Requests;
