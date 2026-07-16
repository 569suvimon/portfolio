
import React from "react";
import { Control, Controller, FieldValues, FieldPath, FieldErrors } from "react-hook-form";
import { Input } from "@/components/common";
import { InputCompProps } from "@/types";

interface InputProps<T extends FieldValues> extends InputCompProps {
  control: Control<T>;
  name: FieldPath<T>;
  title?: string;
  error?: FieldErrors<T>;
  iserror?: string;
  required?: boolean;
  id?: string;
  onChange?: (value: any) => void;
}

function FormInput<T extends FieldValues>({
  id,
  control,
  name,
  title,
  error,
  iserror,
  required = false,
  onChange,
  ...rest
}: InputProps<T>) {
  return (
    <div className="w-full">
      {title && (
        <label
          htmlFor={String(name)}
          className="text-primaryX text-gray-600 text-lg font-normal leading-relaxed"
        >
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={id}
            {...rest}
            {...field}
            onChange={(e: any) => {
              field.onChange(e?.target?.value);
              if (onChange) onChange(e?.target?.value);
            }}
            value={field.value ?? ""}
          />
        )}
      />

      {/* error display */}
      {iserror ? (
        <>
          <span
            className={`transition duration-200 ease-in-out text-red leading-5 ${
              iserror ? "opacity-1" : "opacity-0"
            }`}
          >
            &nbsp;{iserror}&nbsp;
          </span>
        </>
      ) : (
        <>
          {/* <span
            className={`transition duration-200 ease-in-out text-red leading-5 ${
              error[name] ? "opacity-1" : "opacity-0"
            }`}
          >
            &nbsp;{error[name]?.message}&nbsp;
          </span> */}
        </>
      )}
      
    </div>
  );
}

export default FormInput;