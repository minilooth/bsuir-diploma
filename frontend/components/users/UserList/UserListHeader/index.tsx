import React from 'react';
import {Box, Button, Chip, InputAdornment, Paper, Stack, Typography} from "@mui/material";
import {Group, Search} from "@mui/icons-material";
import {Input} from "components/common/Input";

export const UserListHeader: React.FC = () => {
  return (
    <>
      <Stack direction="row" className="justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <Group fontSize="inherit" className="mr-10"/>Пользователи
        </Typography>
        <Box>
          <Input
            placeholder='Поиск'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} className="pt-20 pb-20 align-center">
        <Stack direction="row" spacing={1} className="align-center">
          <Button variant="outlined" color="primary" className="w-100">Добавить</Button>
          <Button variant="outlined" color="primary" className="w-100">Фильтр</Button>
        </Stack>
        <Stack direction="row" spacing={1} className="super-scroll align-center">
          <Chip label="Привилегия: Сотрудник" variant="outlined" color="primary" onDelete={() => console.log("123")}/>
          <Chip label="Имя и фамилия: Матвей Мороз" variant="outlined" color="primary"
                onDelete={() => console.log("123")}/>
          <Chip label="Сортировка: Дата по убыв." variant="outlined" color="primary"
                onDelete={() => console.log("123")}/>
          <Chip label="Имя пользователя: minilooth" variant="outlined" color="primary"
                onDelete={() => console.log("123")}/>
          <Chip label="E-mail: minilooth@gmail.com" variant="outlined" color="primary"
                onDelete={() => console.log("123")}/>
          <Chip label="Номер телефона: +375(29)159-41-65" variant="outlined" color="primary"
                onDelete={() => console.log("123")}/>
        </Stack>
      </Stack>
    </>
  );
};
