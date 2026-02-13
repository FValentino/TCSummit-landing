'use client';

import { Controller, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";

interface InputFormProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>; 
  label: string;
  type?: string;
  error?: FieldError
  placeholder?: string;
  className?: string;
}

export function InputForm<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  type = "text",
  error,
  placeholder,
  className = ""
}: InputFormProps<T>) {
  return (
    <div className={`w-[90%] flex flex-col mt-2 ${className}`}>
      <label 
        htmlFor={name} 
        className="font-bold text-white mb-1"
      >
        {label}:
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`border rounded-lg px-2 py-2 text-gray-900 bg-white/90 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition-all duration-200
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      />
      {error && (
        <p 
          id={`${name}-error`} 
          className="font-bold ms-4 text-sm text-red-400 mt-1"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}