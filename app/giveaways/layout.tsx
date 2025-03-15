"use client"

import { Footer } from "@/components/layout/footer";
import { NavigationBar } from "@/components/ui/navigation-bar";
import React, { ReactNode } from "react";

const GiveawayLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
};

export default GiveawayLayout;
