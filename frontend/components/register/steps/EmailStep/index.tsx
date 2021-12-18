import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, InputAdornment, Stack} from "@mui/material";
import {KeyboardReturn, MailOutline as EmailIcon, SendOutlined, Telegram} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

import {Form} from "components/common/Form";
import {Input} from "components/common/Input";
import {EmailStepSchema} from "schemas/register";
import {useTypedDispatch, useTypedSelector} from "redux/hooks";
import {RegisterCard} from "components/register/RegisterCard";
import {selectEmail} from "redux/slices/register/selectors";
import {setEmail} from "redux/slices/register/actions";
import { back } from 'redux/slices/register';

import styles from 'components/register/steps/EmailStep/EmailStep.module.scss';

export const EmailStep: React.FC = () => {
  const dispatch = useTypedDispatch();
  const email = useTypedSelector(selectEmail);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    mode: "onChange",
    resolver: yupResolver(EmailStepSchema),
    defaultValues: {email}
  })

  const onSubmit = async (data: {email: string}) => {
    await dispatch(setEmail(data));
  }

  const onBack = async () => {
    await dispatch(back());
  }

  return (
    <RegisterCard
      title={'Регистрация'}
      icon={<Telegram fontSize={"inherit"} className="mr-10"/>}
      tip={'Мы отправим вам пароль на электронную почту. Вы сможете изменить его в профиле.'}
      showBottomLink={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2} alignItems={"center"} className={"wp-100"}>
          <Input
            {...register('email')}
            label='E-mail'
            placeholder='Введите e-mail'
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon/>
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"center"} className={"wp-100"}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size={"small"}
              className="mw-100"
              onClick={onBack}
              startIcon={<KeyboardReturn/>}
              disabled={isSubmitting}
            >Назад</Button>
            <LoadingButton
              type={"submit"}
              variant={"outlined"}
              color={"primary"}
              size={"small"}
              className={"mw-100"}
              loadingPosition={"start"}
              loading={isSubmitting}
              startIcon={<SendOutlined/>}
            >Далее</LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </RegisterCard>
  )
}
