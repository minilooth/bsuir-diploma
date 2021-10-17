import React from 'react';
import {Controller} from "react-hook-form";
import {Control} from "react-hook-form/dist/types";
import {TextField} from "@mui/material";
import InputMask, {Props} from 'react-input-mask';
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

interface MaskedInputProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  mask: string;
  id?: string;
  type?: string;
  label?: string | React.ReactNode;
  variant?: "standard" | "filled" | "outlined";
  placeholder?: string;
  className?: string;
  error?: boolean;
  helperText?: string | React.ReactNode;
  inputProps?: Partial<StandardInputProps>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({control, name, defaultValue, mask, className, id, type = 'text', label, variant = 'standard', placeholder, error, helperText, inputProps}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, onBlur, name, value, ref}}) => (
        <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
          {({value: innerValue, onChange: innerOnChange, onBlur: innerOnBlur}: Props) =>
            <TextField
              className={className}
              id={id}
              inputRef={ref}
              type={type}
              label={label}
              variant={variant}
              placeholder={placeholder}
              name={name}
              error={error}
              helperText={helperText}
              fullWidth={true}
              InputProps={inputProps}
              value={innerValue}
              onChange={innerOnChange}
              onBlur={innerOnBlur}
            />
          }
        </InputMask>

      )}
    />
  );
};
