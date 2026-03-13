import { useEffect, useState } from 'react';
import Logo from '../../assets/images/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import HidePasswordIcon from '../../assets/images/icon-hide-password.svg';
import ShowPasswordIcon from '../../assets/images/eye-open.svg';
import AuthIllustration from '../../assets/images/illustration-authentication.svg';
import toast, { Toaster } from 'react-hot-toast';
import { useLogin } from '../../lib/hooks/useAuth';

type Data = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();
  const [formData, setFormData] = useState<Data>({
    email: 'exampleuser@example.com',
    password: 'exampleuser84266+',
  });
  const [showPassword, setShowPassword] = useState(false);

  const notify = () => {
    toast('Hey!', {
      duration: 4000,
      icon: '👋',
      style: {
        background: '#201F24',
        color: '#fff',
      },
    });
    toast(
      'Site is currently in development, you can login with test account.',
      {
        style: {
          background: '#201F24',
          color: '#fff',
        },
      }
    );
  };

  useEffect(() => {
    notify();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        navigate('/dashboard/overview');
      },
      onError: () => {
        toast.error('Login failed. Please check your credentials.');
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
    <main className='bg-beige-100 flex xl:flex-row flex-col h-svh'>
      <section className='hidden xl:flex m-5 relative'>
        <img src={Logo} className='absolute top-10 left-10' alt='logo' />
        <img src={AuthIllustration} className='rounded-lg' alt='auth' />
        <article className='absolute p-10 bottom-0 text-white flex flex-col gap-6'>
          <h1 className='text-preset-1'>
            Keep track of your money and save for your future
          </h1>
          <p className='text-preset-4'>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </article>
      </section>
      <header className='bg-grey-900 py-6 flex justify-center items-center rounded-b-lg xl:hidden'>
        <img src={Logo} alt='logo' />
      </header>
      <form
        className='flex flex-col justify-center flex-1'
        onSubmit={handleSubmit}
      >
        <section className='bg-white flex flex-col gap-8 mx-4 px-5 py-6 justify-center rounded-lg md:mx-26 md:px-8 md:py-8 xl:mx-35 2xl:mx-70'>
          <h2 className='text-preset-1'>Login</h2>

          {error && (
            <div className='text-red-500 text-sm bg-red-50 p-3 rounded'>
              {error instanceof Error
                ? error.message
                : 'An error occurred during login'}
            </div>
          )}

          <fieldset className='flex flex-col gap-4 text-grey-500'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-preset-5-bold'>
                Email
              </label>
              <input
                value={formData.email}
                type='email'
                name='email'
                id='email'
                className='border rounded-lg px-5 py-3'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='pwd' className='text-preset-5-bold'>
                Password
              </label>

              <span className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='pwd'
                  className='border rounded-lg px-5 py-3 w-full'
                  onChange={handleChange}
                  required
                  value={formData.password}
                />
                <img
                  src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  className='h-4 absolute top-4 right-5 cursor-pointer'
                  alt={showPassword ? 'Hide password' : 'Show password'}
                />
              </span>
            </div>
          </fieldset>

          <button
            type='submit'
            className={`btn-dark ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>

          <footer className='flex gap-2 items-center justify-center'>
            <p>Need to create an account?</p>
            <Link to='/signup' className='underline text-preset-4-bold'>
              Sign Up
            </Link>
          </footer>
        </section>
      </form>

      <aside>
        <Toaster position='bottom-right' reverseOrder={false} />
      </aside>
    </main>
  );
};

export default Login;
