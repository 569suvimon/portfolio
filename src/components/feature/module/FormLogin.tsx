"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common";
import { FormInput } from "@/components/form";
import Link from "next/link";
import { FormLoginValidationSchema } from "@/schema";
import { LoginFormData } from "@/types";

const FormLogin = () => {
  const [isDisableForm, setDisableForm] = useState(false);

  const newForm = useForm<LoginFormData>({
    resolver: zodResolver(FormLoginValidationSchema),
    defaultValues: {},
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
    // watch,
  } = newForm;

  const onFinish = (data: LoginFormData) => {
    console.log("From Data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      {/* 
      <FormInput
        id="login99"
        required
        disabled={isDisableForm}
        placeholder={"Please enter email"}
        title={"Email"}
        control={control}
        error={errors}
        type="text"
        name="email"
        // iserror={errors.program?.program_name?.message}
        // name="program.program_name"
        preFix={
          <div className=" bg-green-900 h-12 w-12 mr-2 flex items-center justify-center">
            icn
          </div>
        }
        suffix={
          <div className=" bg-green-900 h-12 w-12 flex items-center justify-center">
            icn
          </div>
        }
        className="px-0"
      />
       
      <FormInput
        id="login98"
        required
        disabled={isDisableForm}
        placeholder={"Please enter password"}
        suffix={
          <div className=" bg-primary h-12 w-12 flex items-center justify-center">
            icn
          </div>
        }
        title={"Password"}
        control={control}
        error={errors}
        name="password"
        type="text"
        className="pr-0"
      />
*/}
      <FormInput
        id="login99"
        required
        disabled={isDisableForm}
        placeholder={"Please enter email"}
        title={"Email"}
        control={control}
        error={errors}
        type="text"
        name="username"
        preFix={
          <div className=" bg-primary-background h-12 w-12 mr-2 flex items-center justify-center">
            icn
          </div>
        }
        className="px-0"
      />
      <FormInput
        id="login99"
        required
        disabled={isDisableForm}
        placeholder={"Please enter Password"}
        title={"Password"}
        control={control}
        error={errors}
        type="text"
        name="password"
        preFix={
          <div className=" bg-primary-background h-12 w-12 mr-2 flex items-center justify-center">
            icn
          </div>
        }
        className="px-0"
      />
      <div className="my-8 flex gap-3">
      <Link href={'/auth/signup'}>
        <Button
          type='submit'
          variant="primary"
          size="lg"
          className='w-[150px]'
          >
          Sign Up
        </Button>
        </Link>
        <Link href={'/auth/signin'} className="">
        <Button
          type='submit'
          variant="primary"
          size="lg"
          className='w-[150px]'
          >
          Login
        </Button>
        </Link>
        {/* <LinkButton/> */}
      </div>
    </form>
  );
};

export default FormLogin;
