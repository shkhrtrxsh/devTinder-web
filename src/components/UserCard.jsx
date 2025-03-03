import React from "react";

const UserCard = ({ user, preview = false }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="px-4 pt-4">
        <img
          src={user.photoUrl}
          alt={user.firstName}
          className="rounded-xl h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-2">
          {user.firstName + " " + user.lastName}
          <div className="badge badge-secondary">{user.age}</div>
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base-content/70">Gender:</span>
            <span className="badge badge-outline">{user.gender}</span>
          </div>

          {user.about && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-base-content/70">
                About Me
              </h3>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{user.about}</p>
              </div>
            </div>
          )}
        </div>

        {!preview && (
          <div className="card-actions justify-end mt-4 pt-4 border-t">
            <button className="btn btn-outline btn-error">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
