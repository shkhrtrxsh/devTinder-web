import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
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
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center min-h-screen">
      {feed && feed.length > 0 ? (
        currentIndex < feed.length ? (
          <UserCard user={feed[currentIndex]} onAction={handleAction} />
        ) : (
          <div className="text-center text-lg">No more users to display.</div>
        )
      ) : (
        <div className="text-center text-lg">
          No users available at the moment.
        </div>
      )}
    </div>
  );
};

export default Feed;
