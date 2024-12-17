import { formatDate } from "@utils/helper";
import { fetchUpcomingHackathon } from "db/crud";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const [hackathons, setHackathons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const upComingHackathons = await fetchUpcomingHackathon();
        setHackathons(upComingHackathons);
      } catch (error) {
        console.error("Error Fetching upcoming events", error);
      }
    };
    fetchHackathons();
  }, []);

  const navigateToHackathonDetails = (id) => {
    router.push(`/hackathons/${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center cyber-glow">
        UPCOMING EVENTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="border border-neonGreen rounded-lg p-6 hover:shadow-hover-neon"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{hackathon.title}</h3>
              <span className="bg-cyan-900 px-3 py-1 rounded-full text-sm">
                {hackathon.time} HRS
              </span>
            </div>
            <p className="mb-4">{hackathon.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-400">
                {formatDate(hackathon.startDate)}
              </span>
              <button
                className="text-sm underline"
                onClick={() => navigateToHackathonDetails(hackathon.id)} 
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
