import React from "react";
import {Checkbox} from "@mui/material";
import {Controller} from "react-hook-form"
import {Control} from "react-hook-form/dist/types";

interface CheckBoxProps {
  control?: Control;
  name: string;
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({control, name, defaultValue, defaultChecked}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => (
        <Checkbox
          color='primary'
          value={value}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
      )}
    />
  )
}
