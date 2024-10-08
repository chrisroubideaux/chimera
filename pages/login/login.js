// login page
import Head from 'next/head';
import { useState } from 'react';
//import axios from 'axios';
import Link from 'next/link';

// metadata

const Login = () => {
  //const [error, setError] = useState(null);

  const handleGoogleLogin = () => {
    console.log('Redirecting to Google login...');
    window.location.href = 'http://localhost:3001/auth/google/login';
  };

  {
    /*
  // Facebook registration function
  const handleFacebookLogin = () => {
    const facebookOAuthURL =
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };
*/
  }

  return (
    <>
      <Head>
        <title>Chimera || Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Frijole&family=Teko:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"
        />
      </Head>
      <div className="text-center py-5 mt-5">
        <Link href="/" className="nav-item"></Link>
        <Link className="nav-link" href="/">
          Back to Menu
        </Link>
        <h1 className="fw-normal">Login</h1>

        <form className="form text-center py-5">
          <div className="container">
            <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
              <li className="ms-3">
                <button className="text-muted bg-transparent border-0">
                  <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                </button>
              </li>
              <li className="ms-3">
                <a
                  className="text-muted bg-transparent border-0"
                  onClick={handleGoogleLogin}
                >
                  <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                </a>
              </li>
            </ul>
          </div>
          {/*
          {error && <p style={{ color: 'red' }}>{error}</p>}
           */}
          <div className="my-5">
            <p className="pt-1 fw-bold">{"Don't have an account?"}</p>
            <Link className="btn btn lg w-75" href="/register/Register/">
              Register
            </Link>

            <p className="mt-1 mb-3 text-muted">&copy; Chimera AI, 2024</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
