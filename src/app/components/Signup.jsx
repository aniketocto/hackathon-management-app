"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "../components/Error";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "db/firebase";
import { useRouter } from "next/navigation";
import { addUserToFirestore } from "../db/crud";
import Link from "next/link";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(email, pwd);

      const user = auth.currentUser;

      const userData = {
        uid: user.uid,
        name: name,
        email: email,
      };

      await addUserToFirestore(userData);

      setEmail("");
      setPwd("");
      setError("");
      setName("");

      router.push("/");
    } catch (errors) {
      console.log(errors);
      setError("Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          To your account if you already have one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            value={name}
            required
            placeholder="Enter username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            value={pwd}
            placeholder="Enter Password"
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        {error && <Error message={error} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? <BeatLoader size={10} color="#00ff9d" /> : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
