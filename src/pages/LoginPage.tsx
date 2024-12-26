import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import logo from '../../public/file_svg.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({
      id: '1',
      username: 'johndoe',
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">

        <div className="flex flex-col items-center">
          <img src={logo} alt='logo' className='h-20 w-20 object-cover' />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              Sign in
            </button>


          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-[20%] h-px bg-[#71717ab9]"></div>
            <span className="text-xs text-[#71717a] capitalize">or continue with socials</span>
            <div className="w-[20%] h-px bg-[#71717a]"></div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="p-1 rounded-md active:scale-95 border shadow-sm font-semibold"
              // onClick={handleClick}
            >
              Google
            </button>

            <p className="text-sm text-center mt-2">
              Do not have an account?
              <Link to={'/signup'} className="text-blue-600 cursor-pointer font-semibold"> Signup</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}




