"use client";

import {
  fetchHackathonById,
  fetchUserFromFirestore,
  registerHackathon,
} from "db/crud";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { formatDate, getformatDate } from "@utils/helper";

const page = () => {
  const [hackathon, setHackathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [createdUser, setCreatedUser] = useState(null);
  const [error, setError] = useState(null);
  const [isOld, setIsOld] = useState(false);
  const pathname = usePathname();
  const hackathonId = pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHackathonById(hackathonId);
        if (data) {
          setHackathon(data);
          const userId = data.createdBy;
          const user = await fetchUserFromFirestore(userId);
          setCreatedUser(user);
          const currentDate = new Date();
          const isOld = data.startDate < getformatDate(currentDate);
          setIsOld(isOld);
        } else {
          setError("Hackathon not found.");
        }
      } catch (err) {
        setError("Error fetching hackathon data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hackathonId]);

  const handleRegister = (hackathonId) => {
    if (hackathonId) {
      registerHackathon(hackathonId);
      alert("Hackathon registered successfully!");
    } else {
      alert("Hackathon not registered");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div id="hackathon" className="">
      <div className="container mx-auto px-6 py-10">
        <div className="border border-neonGreen rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-6">{hackathon.title}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Description</h3>
              <p>{hackathon.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Event Details</h3>
                <p>Start Date: {formatDate(hackathon.startDate)}</p>
                <p>Duration: 48 Hours</p>
                <p>Venue: Virtual Event</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Tech Stacks</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.split(" ").map((tech, index) => (
                    <span
                      key={index}
                      className="bg-cyan-900/50 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Rules</h3>
              <p>{hackathon.rules}</p>
            </div>

            <div className="flex justify-between items-end">
              <button
                onClick={() => handleRegister(hackathonId)}
                disabled={isOld}
                className={`bg-transparent border border-neonGreen shadow-neon px-8 py-3 rounded-lg   ${
                  isOld ? "grayscale cursor-not-allowed" : "hover:shadow-hover-neon"
                }`}
              >
                {isOld ? "Event Closed" : "Regsiter Now"}
              </button>
              <h2>Created by:{createdUser.name} </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
