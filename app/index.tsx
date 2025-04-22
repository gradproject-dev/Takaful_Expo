import React from "react";
import Login from "./Auth/index";
import "./globals.css";
import Charities from "./(main)/Charities";
import { Link } from "expo-router";

const Index = () => {
  // restore the login here
  // return <Charities />;
  return <Login />;
};

export default Index;
