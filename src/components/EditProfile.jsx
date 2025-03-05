import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    about: "",
    skills: ["js"],
    photoUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "male",
        about: user.about || "",
        photoUrl: user.photoUrl || "",
        skills: user.skills || ["js"],
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (formData.age < 18) newErrors.age = "Age must be 18 or above";
    if (!formData.about) newErrors.about = "About section is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setErrors({ ...errors, general: error.response.data.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      {showSuccess && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Your Profile
        </h1>

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {/* Edit Form */}
          <div className="flex-1 max-w-lg">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl justify-center mb-6">
                  Personal Information
                </h2>
                {errors.general && (
                  <div className="alert alert-error mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errors.general}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">First Name</legend>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${
                        errors.firstName ? "input-error" : ""
                      }`}
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                    {errors.firstName && (
                      <div className="text-error text-sm mt-1">
                        {errors.firstName}
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">Last Name</legend>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${
                        errors.lastName ? "input-error" : ""
                      }`}
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                    {errors.lastName && (
                      <div className="text-error text-sm mt-1">
                        {errors.lastName}
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">Age</legend>
                    <input
                      type="number"
                      className={`input input-bordered w-full ${
                        errors.age ? "input-error" : ""
                      }`}
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                    {errors.age && (
                      <div className="text-error text-sm mt-1">
                        {errors.age}
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">Gender</legend>
                    <select
                      className="select select-bordered w-full"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">About</legend>
                    <textarea
                      className={`textarea textarea-bordered w-full h-24 ${
                        errors.about ? "textarea-error" : ""
                      }`}
                      value={formData.about}
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                    />
                    {errors.about && (
                      <div className="text-error text-sm mt-1">
                        {errors.about}
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">Skills</legend>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={formData.skills.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: e.target.value
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Enter skills (comma separated)"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="badge badge-primary">
                          {skill}
                          <button
                            className="ml-2"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                skills: formData.skills.filter(
                                  (_, i) => i !== index
                                ),
                              });
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="form-control">
                    <legend className="font-semibold mb-2">
                      Profile Photo URL
                    </legend>
                    <input
                      type="url"
                      className={`input input-bordered w-full ${
                        errors.photoUrl ? "input-error" : ""
                      }`}
                      value={formData.photoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, photoUrl: e.target.value })
                      }
                      placeholder="Enter photo URL"
                    />
                    {errors.photoUrl && (
                      <div className="text-error text-sm mt-1">
                        {errors.photoUrl}
                      </div>
                    )}
                    {formData.photoUrl && (
                      <div className="mt-4 flex justify-center">
                        <div className="avatar">
                          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={formData.photoUrl}
                              alt="Profile Preview"
                              // onError={(e) => {
                              //   e.target.src = "https://placeholder.com/150";
                              //   setErrors({
                              //     ...errors,
                              //     photoUrl: "Invalid image URL",
                              //   });
                              // }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </fieldset>
                </div>

                <div className="card-actions justify-center mt-8">
                  <button
                    className="btn btn-primary btn-wide btn-lg"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="flex-1 max-w-lg flex flex-col items-center">
            <div className="sticky top-8 w-full">
              <h2 className="text-2xl font-bold text-center mb-6">
                Profile Preview
              </h2>
              <div className="transform hover:scale-105 transition-transform duration-300 flex justify-center">
                <UserCard
                  user={{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    age: formData.age,
                    gender: formData.gender,
                    about: formData.about,
                    photoUrl:
                      formData.photoUrl || "https://placeholder.com/150",
                    skills: formData.skills,
                  }}
                  preview={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
