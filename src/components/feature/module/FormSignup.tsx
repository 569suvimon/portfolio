'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/common';
import { FormInput } from "@/components/form";
import { FormSignupValidationSchema } from "@/schema";
import { SignupFormData } from "@/types";

interface Props {
  onSignin: () => void;
}

const FormSignup = ({
  onSignin,
}: Props) => {
  const [isDisableForm, setDisableForm] = useState(false);

  const newForm = useForm<SignupFormData>({
    resolver: zodResolver(FormSignupValidationSchema),
    defaultValues: {},
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setValue,
    watch
  } = newForm;

  const onFinish = (data: SignupFormData) => {
    console.log(data)
  }
  return (
    <>
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
          {/* Email Input */}
          <div >
            <FormInput
              id="login-email"
              required
              disabled={isDisableForm}
              placeholder={"Please enter name"}
              control={control}
              error={errors}
              type="text"
              name="name"
              className="px-4"
            />
          </div>
          <div >
            <FormInput
              id="login-email"
              required
              disabled={isDisableForm}
              placeholder={"Please enter phone number"}
              control={control}
              error={errors}
              type="text"
              name="phone"
              className="px-4"
            />
          </div>

          <div >
            <FormInput
              id="login-email"
              required
              disabled={isDisableForm}
              placeholder={"Please enter email"}
              control={control}
              error={errors}
              type="text"
              name="email"
              className="px-4"
            />
          </div>

          <div>
            <FormInput
              id="login-password"
              required
              disabled={isDisableForm}
              placeholder={"Please enter password"}
              control={control}
              error={errors}
              type="password"
              name="password"
              className="px-4"
            />
          </div>

          <div>
            <FormInput
              id="login-password"
              required
              disabled={isDisableForm}
              placeholder={"Please enter confirm password"}
              control={control}
              error={errors}
              type="password"
              name="confirm_password"
              className="px-4"
            />
          </div>

          <div>
            <Button size="lg" type="submit">Sign up</Button>
          </div>
        </form>
        {/* login*/}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">
            Have your account?
            <div onClick={onSignin} className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"> Login Now</div>
          </div>
        </div>

      </div>
      <div className="dd">
        <pre className="text-left">{JSON.stringify(watch(), null, 3)}</pre>
      </div>
    </>
  )
}
export default FormSignup;