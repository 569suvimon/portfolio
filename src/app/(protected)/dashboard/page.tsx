"use client";

import { useProfile } from "@/hooks/stores/useProfile";

const DashboardPage = () => {
  const { data: user } = useProfile();
  return (
    <>
      <div className="">Welcome back,</div>
      <div>Permission:</div>
      <div className="">
        <pre className="text-left">{JSON.stringify(user?.roles, null, 3)}</pre>
      </div>
    </>
  );
};

export default DashboardPage;
