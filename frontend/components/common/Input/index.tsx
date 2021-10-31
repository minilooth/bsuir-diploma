import React from 'react';
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {TextField} from "@mui/material";

interface InputProps {
  id?: string;
  type?: string;
  label?: string | React.ReactNode;
  variant?: "standard" | "filled" | "outlined";
  placeholder?: string;
  className?: string;
  name?: string;
  error?: boolean;
  value?: any;
  helperText?: string | React.ReactNode;
  inputProps?: Partial<StandardInputProps>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {id, type = 'text', label, variant = 'standard', fullWidth = true, placeholder, className, name, error, value,
    helperText, inputProps, onChange, onBlur, onKeyDown, autoFocus} = props
  return (
    <TextField
      inputRef={ref}
      className={className}
      name={name}
      label={label}
      fullWidth={fullWidth}
      id={id}
      type={type}
      variant={variant}
      placeholder={placeholder}
      error={error}
      value={value}
      helperText={helperText}
      InputProps={inputProps}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
    />
  )
});

Input.displayName = 'Input';

