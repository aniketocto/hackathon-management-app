"use client";

import React, { useEffect, useState } from "react";
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

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { useRouter } from "next/navigation";
import { addUserToFirestore, handleGoogleAuth } from "db/crud";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInUserWithEmailAndPassword(email, pwd);

      if (res) {
        setEmail("");
        setPwd("");

        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addUserToFirestore(userData);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("An error occurred while signing in google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          To your account if you already have one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            value={email}
            required
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            value={pwd}
            required
            placeholder="Enter Password"
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        {error && <Error message={error} />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#00ff9d" /> : "Login"}
        </Button>
        <Button onClick={handleGoogleAuth} disabled={loading}>
          {loading ? "Loading..." : "Google"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
