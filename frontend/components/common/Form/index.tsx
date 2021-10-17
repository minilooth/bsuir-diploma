import React from 'react';

interface FormProps {
  className?: string;
  onSubmit?: (...data: any) => void;
  onReset?: () => void;
  id?: string
}

export const Form: React.FC<FormProps> = ({children, className, onSubmit, id, onReset}) => {
  return (
    <form
      noValidate
      className={className}
      onSubmit={onSubmit}
      onReset={onReset}
      id={id}
    >
      {children}
    </form>
  )
}
