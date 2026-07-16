"use client";
import { useState } from "react";
import { Modal } from "@/components/common";
import { useModalStore } from "@/stores/modal.store";
import { FormSignin, FormSignup, ForgotPassword } from "@/components/feature";

type AuthView = "signin" | "signup" | "forgot";

interface Props {
  id: string;
}

export default function LoginModal({ id }: Props) {
  const [view, setView] = useState<AuthView>("signin");
  const closeById = useModalStore((s) => s.closeModalById);
  return (
    <Modal id={id} className="">
      <div className="w-full flex flex-col gap-3">
        {view === "signin" && (
          <>
            <div className="flex justify-between pb-6">
              <h1>Login</h1>
              <div
                className="cursor-pointer text-red-500"
                onClick={() => closeById(id)}
              >
                x
              </div>
            </div>
            <FormSignin
              onSignup={() => setView("signup")}
              onForgot={() => setView("forgot")}
            />
          </>
        )}

        {view === "signup" && (
          <>
            <div className="flex justify-between pb-6">
              <h1>Sign up</h1>
              <div
                className="cursor-pointer text-red-500"
                onClick={() => closeById(id)}
              >
                x
              </div>
            </div>
            <FormSignup onSignin={() => setView("signin")} />
          </>
        )}

        {view === "forgot" && (
          <>
          <div className="flex justify-between pb-6">
              <h1>ForgotPassword</h1>
              <div
                className="cursor-pointer text-red-500"
                onClick={() => closeById(id)}
              >
                x
              </div>
            </div>
          <ForgotPassword onBack={() => setView("signin")} />
          </>
        )}
      </div>
    </Modal>
  );
}
