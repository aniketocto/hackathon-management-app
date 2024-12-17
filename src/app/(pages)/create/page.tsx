"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { addHackathon } from "db/crud";
import { auth } from "db/firebase";
import { useRouter } from "next/navigation";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    time: "",
    technologies: "",
    venue: "",
    rules: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.time ||
      !formData.technologies ||
      !formData.venue ||
      !formData.rules
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const currentUser = await auth.currentUser;
      if (!currentUser) {
        alert("User not authenticated.");
        router.push("/login");
      } else {
        const hackathonId = await addHackathon(formData);
        alert("Hackathon successfully created!");

        setFormData({
          title: "",
          description: "",
          startDate: "",
          time: "",
          technologies: "",
          venue: "",
          rules: "",
        });
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
      alert("Failed to create hackathon. Please try again.");
    }
  };

  return (
    <div className="min-h-[72vh] mt-14 m-auto w-[1000px] max-w-[80%]">
      <h3 className="text-2xl font-bold mb-6 text-neonGreen text-shadow-neon">
        Create Hackathon
      </h3>
      <form className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-md mb-1 text-neonGreen">Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="block text-mdmb-1 text-neonGreen">
              Decription
            </label>
            <Textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
              placeholder="Description"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-md mb-1 text-neonGreen">
              Venue/ Location
            </label>
            <Input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
              placeholder="Venue"
            />
          </div>
          <div>
            <label className="block text-md mb-1 text-neonGreen">
              Technologies
            </label>
            <Input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
              placeholder="Ex. Java, Python"
            />
          </div>
          <div>
            <label className="block text-md mb-1 text-neonGreen">
              Start Date
            </label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
            />
          </div>
          <div>
            <label className="block text-md mb-1 text-neonGreen">
              End Date
            </label>
            <Input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="In hours"
              required
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-mdmb-1 text-neonGreen">
              Rules / Regulation
            </label>
            <Textarea
              required
              name="rules"
              value={formData.rules}
              onChange={handleChange}
              className="bg-transparent border border-neonGreen py-2 px-4 placeholder:text-neonGreen outline-none"
              placeholder="Rules"
            />
          </div>
        </div>
        <div className="flex md:justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-transparent border text-white border-neonGreen rounded-lg shadow-neon"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
