import React from 'react';
import {Controller} from "react-hook-form";
import {InputAdornmentProps, TextField} from "@mui/material";
import {DatePicker} from "@mui/lab";
import {Control} from "react-hook-form/dist/types";

interface DateSelectorProps {
  control?: Control<any>;
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  className?: string;
  error?: boolean;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
                                                            control,
                                                            name,
                                                            defaultValue,
                                                            label,
                                                            placeholder,
                                                            InputAdornmentProps,
                                                            className,
                                                            error
                                                          }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => (
        <DatePicker
          label={label}
          value={value}
          error={error}
          onChange={onChange}
          InputAdornmentProps={InputAdornmentProps}
          renderInput={(params) => <TextField className={className} variant={"standard"} color={"primary"}
                                              fullWidth {...params} />}
        />
      )}
    />
  )
}
