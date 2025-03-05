import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, preview = false, onAction }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Request sent!");
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request");
    }
  };

  return (
    <div className="card bg-base-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <figure className="px-4 pt-4">
        <img
          src={user?.photoUrl}
          alt={user?.firstName}
          className="rounded-full h-80 w-80 object-cover border-4 border-white shadow-md"
        />
      </figure>
      <div className="card-body text-center">
        <div className="flex flex-col items-center">
          <h2 className="card-title text-2xl font-bold mb-2 text-center flex items-center">
            {user?.firstName + " " + user?.lastName}
            <div className="badge badge-secondary ml-2">{user?.age}</div>
          </h2>
        </div>
        <div className="space-y-3 text-center">
          <div className="flex justify-center gap-2">
            <span className="text-base-content/70">Gender:</span>
            <span className="badge badge-outline">{user?.gender}</span>
          </div>
          {user?.about && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-base-content/70">
                About Me
              </h3>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{user?.about}</p>
              </div>
            </div>
          )}
        </div>
        {!preview && (
          <div className="card-actions justify-center mt-4 pt-4 border-t">
            <button
              className="btn btn-outline btn-error w-1/2"
              onClick={() => {
                handleSendRequest("ignored", user?._id);
                onAction();
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary w-1/2"
              onClick={() => {
                handleSendRequest("interested", user?._id);
                onAction();
              }}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
