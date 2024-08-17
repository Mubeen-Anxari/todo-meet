"use client";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
