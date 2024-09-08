"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.jwt}; path=/`; 
        router.push('/main'); 
      } else {
        console.error('Login failed');
      }
    };
  
    return (

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          alt="Your Company"
          src="/CulinLogo.png"
          className="mx-auto h-16 w-auto"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Not a member?{' '}
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register today!
          </a>
        </p>
      </div>
    </div>

      // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      //     <img src="/CulinLogo.png" className="mx-auto h-10 w-auto" alt="Flowbite Logo" />
      //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
      //       Login to your acccount
      //     </h2>
      //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      //       <form onSubmit={handleLogin} className="space-y-6">
      //         <div>
      //           <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
      //             Username
      //           </label>
      //           <div className="mt-2">
      //             <input
      //               type="text"
      //               id="username"
      //               value={username}
      //               onChange={(e) => setUsername(e.target.value)}
      //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      //               required
      //             />
      //           </div>
      //         </div>
      //         <div>
      //           <div className="flex items-center justify-between">
      //             <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
      //               Password
      //             </label>
      //             <div className="text-sm">
      //               <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
      //                 Forgot password?
      //               </a>
      //             </div>
      //           </div>
                
      //         </div>
      //       </form>
      //     </div>
      //   </div>


      //   {/* <h1>Login</h1>
      //   <form onSubmit={handleLogin}>
      //     <div>
      //       <label htmlFor="username">Username:</label>
      //       <input
      //         type="text"
      //         id="username"
      //         value={username}
      //         onChange={(e) => setUsername(e.target.value)}
      //         required
      //       />
      //     </div>
      //     <div>
      //       <label htmlFor="password">Password:</label>
      //       <input
      //         type="password"
      //         id="password"
      //         value={password}
      //         onChange={(e) => setPassword(e.target.value)}
      //         required
      //       />
      //     </div>
      //     <button type="submit">Login</button>
      //   </form> */}
      // </div>
    );
  };
  
  export default LoginPage;
  