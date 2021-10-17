import React, {ChangeEvent} from 'react';
import {Box, Button, Chip, InputAdornment, Stack, Typography} from "@mui/material";
import {Group, Search} from "@mui/icons-material";
import {Input} from "components/common/Input";
import {UserFilter} from "components/users/UserList/UserListHeader/UserFilter";
import {SortItems} from "types/user";
import {useForm} from "react-hook-form";
import debounce from 'debounce'
import {useQuery} from "core/hooks/useQuery";
import {SortDirection} from "types/common/sort-direction";
import {DateUtils} from "utils/DateUtils";
import {ProcessUserDialog} from "components/users/ProcessUserDialog";

export const UserListHeader: React.FC = () => {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [processDialogOpened, setProcessDialogOpened] = React.useState(false);
  const {values, deleteFromQuery, appendToQuery, push} = useQuery();

  const {register} = useForm({
    defaultValues: {
      search: values.search ?? ''
    }
  })

  const toggleFilterDialog = () => {
    setFilterOpened((prev) => !prev);
  }

  const toggleProcessDialog = () => {
    setProcessDialogOpened((prev) => !prev);
  }

  const deleteFilterItem = async (key: string | string[]) => {
    deleteFromQuery(key);
    await push()
  }

  const onSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    appendToQuery({
      search: event.target.value
    });
    await push();
  }

  const sort = SortItems.find(i => i.query === values.sort)?.label;
  const sortDirection = SortDirection[values.sortDirection as keyof typeof SortDirection]?.toLowerCase();
  const fullname = values.fullname;
  const email = values.email;
  const phoneNumber = values.phoneNumber;
  const registerDateFrom = values.registerDateFrom
    ? DateUtils.formatFromNumber(values.registerDateFrom, 'dd/MM/yyyy')
    : null;
  const registerDateTo = values.registerDateTo
    ? DateUtils.formatFromNumber(values.registerDateTo, 'dd/MM/yyyy')
    : null;

  return (
    <>
      <Stack direction="row" className="justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <Group fontSize="inherit" className="mr-10"/>Пользователи
        </Typography>
        <Box>
          <Input
            {...register('search')}
            placeholder='Поиск'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
            onChange={debounce(onSearch, 1000)}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} className="pt-20 pb-20 align-center">
        <Stack direction="row" spacing={1} className="align-center">
          <Button variant="outlined" color="primary" className="w-100" onClick={toggleProcessDialog}>Добавить</Button>
          <Button variant="outlined" color="primary" className="w-100" onClick={toggleFilterDialog}>Фильтр</Button>
        </Stack>
        <Stack direction="row" spacing={1} className="super-scroll align-center">
          {sort && sortDirection && (
            <Chip
              label={`Сортировка: ${sort} ${sortDirection}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['sort', 'sortDirection'])}/>
          )}
          {fullname && (
            <Chip
              label={`Имя и фамилия: ${fullname}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('fullname')}/>
          )}
          {email && (
            <Chip
              label={`E-mail: ${email}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('email')}/>
          )}
          {phoneNumber && (
            <Chip
              label={`Номер телефона: ${phoneNumber}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem('phoneNumber')}/>
          )}
          {(registerDateFrom || registerDateTo) && (
            <Chip
              label={`Дата регистрации: ${registerDateFrom ?? ''}${registerDateFrom && registerDateTo ? ' - ' : ''}${registerDateTo ?? ''}`}
              variant="outlined" color="primary"
              onDelete={() => deleteFilterItem(['registerDateFrom', 'registerDateTo'])}/>
          )}
        </Stack>
      </Stack>
      {filterOpened && <UserFilter open={filterOpened} onClose={toggleFilterDialog}/>}
      {processDialogOpened && (
        <ProcessUserDialog
          open={processDialogOpened}
          onClose={toggleProcessDialog}
        />
      )}
    </>
  );
}
