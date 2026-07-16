"use client"
import React from 'react';
import { useAuthStore } from "@/stores/auth.store";
import { PageTransition } from "@/components/feature";

const ExplorePage = () => {
   const isUser = useAuthStore();
  return (
    <PageTransition> <pre className="text-left">ExplorePage</pre>
    <pre className="text-left">{JSON.stringify(isUser, null, 3)}</pre>
    </PageTransition>
  )
}

export default ExplorePage;