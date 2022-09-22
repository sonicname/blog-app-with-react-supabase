import { memo } from 'react';
import classNames from 'classnames';
import { Control, useController } from 'react-hook-form';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorComponent from './errors/ErrorComponent';

interface IProps {
  type: string;
  name: string;
  control?: Control;
  placeholder?: string;
}

const Input = ({ type, control, name, placeholder }: IProps) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: '',
  });

  return (
    <input
      id={name}
      type={type}
      className={classNames(
        'border border-[#3A3A43] rounded-md max-w-full w-full p-[15px] shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent',
      )}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default memo(
  withErrorBoundary(Input, {
    FallbackComponent: ErrorComponent,
  }),
);
