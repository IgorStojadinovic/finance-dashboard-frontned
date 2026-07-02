import { useState } from 'react';
import { useRegister } from '../../lib/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Logo from '../../assets/images/Logo.svg';
import AuthIllustration from '../../assets/images/illustration-authentication.svg';
import HidePasswordIcon from '../../assets/images/icon-hide-password.svg';
import ShowPasswordIcon from '../../assets/images/eye-open.svg';
import { Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData, {
      onSuccess: () => {
        navigate('/dashboard/overview'); 
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='bg-beige-100 flex flex-col h-svh xl:flex-row'>
      <div className='bg-grey-900 py-6 flex justify-center items-center rounded-b-lg xl:hidden'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='hidden xl:flex m-5 relative '>
        <img src={Logo} className='absolute top-10 left-10' alt='Logo' />
        <img
          src={AuthIllustration}
          className='rounded-lg'
          alt='Authentication illustration'
        />
        <div className='absolute p-10 bottom-0 text-white flex flex-col gap-6'>
          <h1 className='text-preset-1 '>
            Keep track of your money and save for your future
          </h1>
          <p className='text-preset-4 '>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <form
        className='flex flex-col justify-center flex-1'
        onSubmit={handleSubmit}
      >
        <div className='bg-white flex flex-col gap-8 mx-4 px-5 py-6  justify-center rounded-lg md:mx-26 md:px-8 md:py-8  xl:mx-35 2xl:mx-70'>
          <h2 className='text-preset-1'>Signup</h2>

          {error && (
            <div className='text-red-500 text-sm bg-red-50 p-3 rounded'>
              {error instanceof Error
                ? error.message
                : 'Greška prilikom registracije'}
            </div>
          )}

          <div className='flex flex-col gap-4  text-grey-500'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name' className='text-preset-5-bold'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className='border rounded-lg px-5 py-3'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-preset-5-bold'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='border rounded-lg px-5 py-3'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col gap-1 '>
              <label htmlFor='pwd' className='text-preset-5-bold'>
                Password
              </label>

              <div className='relative '>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='pwd'
                  className='border rounded-lg px-5 py-3 w-full'
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <img
                  src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  className='h-4 absolute top-4 right-5 cursor-pointer'
                  alt={showPassword ? 'Hide password' : 'Show password'}
                />
              </div>
              <span className='text-preset-5 text-right'>
                Passwords must be at least 8 characters
              </span>
            </div>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className={`btn-dark ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className='flex gap-2 items-center justify-center'>
            <p>Already have an account?</p>
            <Link to='/' className='underline text-preset-4-bold'>
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
