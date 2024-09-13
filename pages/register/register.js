// resgiter page
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// metadata

const Register = () => {
  // Google registration function
  const handleGoogleRegister = () => {
    const googleOAuthURL = 'http://localhost:3001/auth/google/login';

    window.open(
      googleOAuthURL,
      'Google OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  // facebook registration function

  return (
    <>
      <Head>
        <title>Chimera || Register</title>
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
        <Link className="nav-link" href="/dashboard/dashboard/">
          Back to Dashboard
        </Link>
        <h1 className="fw-normal">Register</h1>

        <form className="form text-center py-5">
          <div className="container">
            <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
              <li className="ms-3">
                <button className="text-muted bg-transparent border-0">
                  <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                </button>
              </li>
              <li className="ms-3">
                <button
                  className="text-muted bg-transparent border-0"
                  type="button"
                  onClick={handleGoogleRegister}
                >
                  <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                </button>
              </li>
            </ul>
          </div>

          <div className="my-5">
            <p className="pt-1 fw-bold">{'Already have an account?'}</p>
            <Link className="btn btn lg w-75" href="/login/login/">
              Login
            </Link>
            <p className="mt-1 mb-3 text-muted">&copy; Chimera AI, 2024</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
