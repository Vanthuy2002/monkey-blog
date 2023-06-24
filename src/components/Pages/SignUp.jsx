import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  EyeClose,
  EyeIcon,
  Label,
  Input,
  Field,
  logo,
  messLog,
  toast,
} from '../import';

const SignUpStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    width: 80px;
    height: 100px;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 500;
    margin: 16px 0px 30px 0px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object({
    username: yup.string().required(messLog.required),
    email: yup.string().required(messLog.required).email(messLog.email),
    password: yup.string().required(messLog.required).min(8, messLog.password),
  });

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const handleSignUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: values.username,
    });

    const userRef = collection(db, 'users');
    await addDoc(userRef, {
      username: values.username,
      email: values.email,
      password: values.password,
    });

    toast.success('Create accounts success!!');
    navigate('/');
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.warn(arrErrors[0]?.message);
    }
  }, [errors]);

  return (
    <SignUpStyles>
      <div className='container'>
        <img className='logo' src={logo} alt='' />
        <h1 className='heading'>Monkey Blogging</h1>

        <form
          autoComplete='off'
          className='form'
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Field>
            <Label htmlFor='username'>UserName</Label>
            <Input
              type='text'
              name='username'
              placeholder='Enter your username...'
              control={control}
            ></Input>

            <Label htmlFor='email'>Email Addr</Label>
            <Input
              type='text'
              name='email'
              placeholder='Enter your email...'
              control={control}
            ></Input>

            <Label htmlFor='password'>Password</Label>
            <Input
              type={showPass ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password...'
              control={control}
            >
              {showPass ? (
                <EyeIcon
                  className='eye'
                  onClick={() => setShowPass(false)}
                ></EyeIcon>
              ) : (
                <EyeClose
                  className='eye'
                  onClick={() => setShowPass(true)}
                ></EyeClose>
              )}
            </Input>
          </Field>

          <Button
            type='submit'
            style={{ width: 200, margin: '0 auto' }}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Register
          </Button>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUp;
