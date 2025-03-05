import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleAction = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < feed.length) {
        return newIndex;
      } else {
        return feed.length > 0 ? feed.length - 1 : 0; // Reset to last valid index or 0 if no users
      }
    });

    // Dispatch removeUserFromFeed action
    dispatch(removeUserFromFeed(feed[currentIndex])); // Assuming each user has a unique 'id'

    // Check if the currentIndex is out of bounds after the action
    if (currentIndex >= feed.length - 1) {
      setCurrentIndex(feed.length - 1); // Reset to last valid index
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center min-h-screen">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} onAction={handleAction} />
      ) : (
        <div className="text-center text-lg">
          No users available at the moment.
        </div>
      )}
    </div>
  );
};

export default Feed;
