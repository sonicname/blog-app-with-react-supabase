import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../components/Button';
import Heading from '../components/Heading';
import Field from '../components/form/Field';
import SubHeading from '../components/SubHeading';

import { schema } from '../config/schema';
import { useAuth } from '../context/supabase-context';

const SignUpPage = () => {
  const { signUp, session } = useAuth();
  if (session?.user) return <Navigate to={'/'} />;

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  return (
    <div className='max-w-[556px] w-full shadow-md px-[30px] lg:px-[50px] py-[20px] lg:py-[63px] bg-[#1C1C24] rounded-lg'>
      <Heading content={'Đăng ký tài khoản'}>
        <SubHeading content={'Đã có tài khoản rồi?'} hrefText={'Đăng nhập'} to={'/auth/signin'} />
      </Heading>

      <form
        // @ts-ignore
        onSubmit={handleSubmit(signUp)}
        className='mt-[20px] flex flex-col gap-y-[20px] lg:gap-y-[20px]'
      >
        <Field
          control={control}
          error={errors?.email?.message}
          labelText='Email'
          name='email'
          placeholder='Nhập địa chỉ email của bạn'
          type='email'
        />

        <Field
          control={control}
          error={errors?.password?.message}
          labelText='Password'
          name='password'
          placeholder='Điền mật khẩu của bạn'
          type='password'
        />

        <Button className='duration-75 active:scale-90' type={'submit'} disabled={isSubmitting}>
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
