import { Control, DeepRequired, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import Input from './Input';
import Label from './Label';

interface IProps {
  labelText: string;
  name: string;
  type: string;
  placeholder: string;
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
  control: Control;
}

const Field = ({ error, control, labelText, name, placeholder, type }: IProps) => {
  return (
    <div className='flex flex-col gap-y-[10px] w-full'>
      <Label text={labelText} htmlFor={name} />
      <Input type={type} control={control} name={name} placeholder={placeholder} />

      {error && (
        // @ts-ignore
        <span className='text-red-500 text-[14px] font-medium'>{error}</span>
      )}
    </div>
  );
};

export default Field;
