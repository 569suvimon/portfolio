"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Notfound = () => {
  const router = useRouter();

  // 10 นาที = 600 วินาที
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  // แปลงเป็น นาที:วินาที
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="">
        <div className="w-9/12 m-auto py-16 min-h-screenC flex items-center justify-center">
          <div className="overflow-hidden pb-8">
            <div className=" text-center pt-8">
              <h1 className="text-9xl font-bold text-purple-400">404</h1>
              <h1 className="text-6xl font-medium py-8">
                oops! Page not found
              </h1>
              <p className="text-2xl pb-8 px-12 font-medium">
                Oops! The page you are looking for does not exist. It might have
                been moved or deleted.
              </p>
              <p className="text-xl text-gray-500">
              Redirecting to home in{" "}
              <span className="font-bold text-purple-500">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;
