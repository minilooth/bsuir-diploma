import React from 'react';
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {TextField} from "@mui/material";

interface InputProps {
  id?: string;
  type?: string;
  label?: string;
  variant?: "standard" | "filled" | "outlined";
  placeholder?: string;
  className?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  inputProps?: Partial<StandardInputProps>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(({id, type = 'text', label, name, variant = 'standard', error, helperText, inputProps, placeholder, className, onChange, onBlur}, ref) => {
  return (
    <TextField
      className={className}
      inputRef={ref}
      id={id}
      type={type}
      label={label}
      variant={variant}
      placeholder={placeholder}
      name={name}
      error={error}
      helperText={helperText}
      fullWidth={true}
      InputProps={inputProps}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
})

Input.displayName = 'Input';
