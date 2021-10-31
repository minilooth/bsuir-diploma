import React from "react";
import {Checkbox} from "@mui/material";

interface CheckBoxProps {
  name?: string;
  checked?: boolean;
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent) => void;
  size?: 'medium' | 'small';
  sx?: any;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({name, checked, defaultValue, defaultChecked, value, onChange, onBlur, size, sx}, ref) => {
  return (
    <Checkbox
      color={"primary"}
      name={name}
      checked={checked}
      defaultValue={defaultValue}
      defaultChecked={defaultChecked}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      size={size}
      sx={sx}
    />
  )
})

CheckBox.displayName = 'CheckBox';
