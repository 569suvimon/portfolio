"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, LinkButton, PreFixIcons } from "@/components/common";
import { FormInput } from "@/components/form";
import {
  IcnMail,
  IcnKey,
  IcnGitHub,
  IcnGoogle,
} from "@/components/icons";
import { useRouter } from "next/navigation";

import { useModalStore } from "@/stores/modal.store";
import { useAuth } from "@/hooks/stores/useAuth";
import { FormLoginValidationSchema } from "@/schema";
import { LoginFormData } from "@/types";

interface Props {
  onSignup: () => void;
  onForgot: () => void;
}

const FormSignin = ({ onSignup, onForgot }: Props) => {
  const router = useRouter();
  const closeModal = useModalStore((s) => s.closeModal);

  const { login, isLoginLoading } = useAuth();

  const newForm = useForm<LoginFormData>({
    resolver: zodResolver(FormLoginValidationSchema),
    defaultValues: {},
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
    watch,
  } = newForm;

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);

      closeModal();
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <FormInput
              id="login-email"
              required
              placeholder={"Please enter email"}
              title={"Email"}
              control={control}
              error={errors}
              type="text"
              name="username"
              preFix={<PreFixIcons icn={<IcnMail />} />}
              className="px-0"
            />
          </div>

          {/* Password Input */}
          <div>
            <FormInput
              id="login-password"
              required
              placeholder={"Please enter email"}
              title={"Password"}
              control={control}
              error={errors}
              type="password"
              name="password"
              preFix={<PreFixIcons icn={<IcnKey />} />}
              className="px-0"
            />
          </div>

          {/* Remember and Forgot */}
          <div className="flex items-center">
            {/* <input id="remember_me" name="remember_me" type="checkbox" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    <label for="remember_me" className="ml-2 block text-sm text-gray-700">Remember me</label> */}
            <div
              onClick={onForgot}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Forgot password?
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button loading={isLoginLoading} size="lg" shape="square" className="w-full relative">
              {/* {isLoginLoading && (
                <IcnBiLoader className="w-6 h-6 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600 absolute left-1/2 -translate-x-1/2 -translate-x-[55px]" />
              )} */}
              Sign in
            </Button>
          </div>
        </div>
      </form>

      {/* Divider */}
      <div className="mt-6">
        <Divider description="Or continue with" />
      </div>

      {/* Social Logins */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <LinkButton variant={"outline"} shape="square" >
          <IcnGoogle />
          Google
        </LinkButton>
        <LinkButton variant={"outline"} shape="square" >
          <IcnGitHub />
          GitHub
        </LinkButton>
      </div>

      {/* Sign Up Link  */}
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600">
          Don't have an account?
          <div
            onClick={onSignup}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            &nbsp;Sign up
          </div>
        </div>
      </div>
      <div className="dd">
        <pre className="text-left">{JSON.stringify(watch(), null, 3)}</pre>
      </div>
    </>
  );
};

export default FormSignin;
