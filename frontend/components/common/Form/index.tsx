import React from 'react';

interface FormProps {
  className?: string;
  onSubmit?: (...data: any) => void;
}

export const Form: React.FC<FormProps> = ({children, className, onSubmit}) => {
  return (
    <form
      noValidate
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
