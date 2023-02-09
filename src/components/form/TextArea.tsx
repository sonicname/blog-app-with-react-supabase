import { memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Control, useController } from 'react-hook-form';

import ErrorComponent from '../ErrorComponent';

interface IProps {
  name: string;
  control: Control;
  row?: number;
  placeholder?: string;
}

const TextArea = ({ name, control, row, placeholder }: IProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <textarea
      {...field}
      className='border border-[#3A3A43] rounded-md max-w-full w-full p-[15px] shadow outline-none text-white font-medium text-[14px] placeholder:text-[#4B5264] bg-transparent resize-y'
      rows={row}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
