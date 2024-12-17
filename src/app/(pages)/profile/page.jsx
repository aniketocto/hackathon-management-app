"use client";

import {
  fetchUserFromFirestore,
  fetchUserRegisteredHackathons,
  fetchUserCreatedHackathons,
} from "db/crud";
import { auth } from "db/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hackathons, setHackathons] = useState([]);
  const [createdHackathons, setCreatedHackathons] = useState([]); // New state for created hackathons
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUID = localStorage.getItem("userUID");
        if (storedUID) {
          const data = await fetchUserFromFirestore(storedUID);
          setUserData(data);
        } else {
          const currentUser = auth.currentUser;
          if (currentUser) {
            localStorage.setItem("userUID", currentUser.uid);
            const data = await fetchUserFromFirestore(currentUser.uid);
            setUserData(data);
          } else {
            setUserData(null);
          }
        }

        const registeredData = await fetchUserRegisteredHackathons();
        setHackathons(registeredData);

        const createdData = await fetchUserCreatedHackathons(storedUID);
        setCreatedHackathons(createdData);
        console.log(createdData);
      } catch (error) {
        console.error("Error loading user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToHackathonDetails = (id) => {
    router.push(`/hackathons/${id}`);
  };

  if (loading) return <div className="min-h-[79vh]" >Loading...</div>;

  return (
    <div className="container min-h-[79vh] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border-neonGreen border rounded-lg p-6 col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-neonGreen border mb-4 flex items-center justify-center">
              <span className="text-5xl">
                {userData?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <h2 className="text-3xl uppercase text-center font-bold mb-2 text-shadow-neon">
              {userData.name}
            </h2>
            <h3 className="mb-5">{userData.email}</h3>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span>Hackathons Participated: </span>
                <span>{hackathons.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Hackathons Created: </span>
                <span>{createdHackathons.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-neonGreen rounded-lg p-6 col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">Participated Hackathons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            {hackathons.length > 0 ? (
              hackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="border border-neonGreen rounded-lg p-4"
                >
                  <h4 className="font-bold mb-2">{hackathon.title}</h4>
                  <p className="text-sm mb-4 text-cyan-400">
                    {hackathon.description}
                  </p>
                  <button
                    className="text-sm underline"
                    onClick={() => navigateToHackathonDetails(hackathon.id)}
                  >
                    Learn More
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                You haven't registered for any hackathons yet.
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-6">Created Hackathons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            {createdHackathons.length > 0 ? (
              createdHackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="border border-neonGreen rounded-lg p-4"
                >
                  <h4 className="font-bold mb-2">{hackathon.title}</h4>
                  <p className="text-sm mb-4 text-cyan-400">
                    {hackathon.description}
                  </p>
                  <button
                    className="text-sm underline"
                    onClick={() => navigateToHackathonDetails(hackathon.id)}
                  >
                    Learn More
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                You haven't Created any Hacakathons Yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
