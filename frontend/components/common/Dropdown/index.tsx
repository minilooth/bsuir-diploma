import React from 'react';
import {Controller} from 'react-hook-form';
import {Control} from "react-hook-form/dist/types";
import {FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent} from "@mui/material";

interface DropdownProps {
  children: React.ReactNode | React.ReactNode[];
  control?: Control<any>;
  name: string,
  defaultValue?: string | number | readonly string[];
  label?: string;
  labelId?: string;
  className?: string;
  startAdornment?: React.ReactNode;
  placeholder?: string;
  displayEmpty?: boolean
  error?: boolean;
  helperText?: string | React.ReactNode;
  onChange?: (event: SelectChangeEvent<HTMLInputElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                    control,
                                                    name,
                                                    defaultValue,
                                                    className,
                                                    placeholder,
                                                    label,
                                                    labelId,
                                                    children,
                                                    helperText,
                                                    error,
                                                    onChange: providedOnChange,
                                                    ...other
                                                  }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, onBlur, value}}) => (
        <FormControl fullWidth variant="standard" className={className} placeholder={placeholder}>
          <InputLabel id={labelId} error={error}>{label}</InputLabel>
          <Select
            labelId={labelId}
            label={label}
            placeholder={placeholder}
            fullWidth
            value={value}
            onChange={providedOnChange ?? onChange}
            onBlur={onBlur}
            error={error}
            {...other}
          >
            {children}
          </Select>
          <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
