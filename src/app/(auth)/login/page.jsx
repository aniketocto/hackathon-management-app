import {  Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import React from "react";
import Login from '../../components/Login'
import Signup from '../../components/Signup'

const page = () => {
  return (
    <div className="min-h-screen flex  flex-col items-center gap-10">
      <h2 className="mt-10  sm:mt-16 text-3xl sm:text-6xl lg:text-7xl text-neonGreen text-center font-extrabold animate-glitch text-shadow-neon">
        Login / Signup
      </h2>
      <Tabs defaultValue="login" className="w-[400px] max-w-[90%] sm:mt-0 mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
