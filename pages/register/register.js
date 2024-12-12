import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect/dist/core';

const Register = () => {
  // Type effect
  useEffect(() => {
    const typewriter = new Typewriter('#typewriter', {
      strings: ['Welcome to Chimera AI', 'Revolutionizing Business Management'],
      autoStart: true,
      loop: true,
      delay: 75,
    });
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords must match.');
      } else if (
        name === 'password' &&
        formData.confirmPassword !== '' &&
        value !== formData.confirmPassword
      ) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/users',
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        }

        setSuccessMessage('Registration successful!');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  const handleFacebookRegister = () => {
    const facebookOAuthURL = 'http://localhost:3001/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };
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
      <div className=" h-100">
        <div className="mt-5 h-100">
          <div className="container d-flex flex-wrap justify-content-center justify-content-lg-start mt-5">
            <div className=" pt-1 pt-md-4 pb-4">
              <div className=" justify-content-center">
                <Link className="text-center nav-link text-underlined" href="/">
                  back to menu
                </Link>
                <h1 className="text-center">Register</h1>
                <p className="text-center  pb-3 mb-3">
                  Already have an account?{' '}
                  <Link className="text-dark" href="/login/login">
                    <small>login here</small>
                  </Link>
                </p>
                <hr className="my-4" />
                <ul className="nav justify-content-center list-unstyled d-flex pt-1 mt-3 h-100">
                  <form className="form text-center" onSubmit={handleSubmit}>
                    <input
                      className="form-control m-2 fw-bold"
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                    />
                    <input
                      className="form-control m-2 fw-bold"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
                    <input
                      className={`form-control m-2 fw-bold ${
                        passwordError ? 'is-invalid' : ''
                      }`}
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                    />
                    <input
                      className={`form-control m-2 fw-bold ${
                        passwordError ? 'is-invalid' : ''
                      }`}
                      required
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                    {passwordError && (
                      <p className="text-danger fw-bold">{passwordError}</p>
                    )}
                    <div className="container">
                      <button className="w-100 btn btn-md" type="submit">
                        Register
                      </button>
                      <h6 className="text-muted pt-3">or register with</h6>

                      <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
                        <li className="ms-3">
                          <button className="text-muted bg-transparent border-0">
                            <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                          </button>
                        </li>
                        <li className="ms-3">
                          <button
                            className="text-muted bg-transparent border-0"
                            onClick={handleGoogleRegister}
                          >
                            <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
                    {successMessage && (
                      <p className="text-success">{successMessage}</p>
                    )}
                  </form>

                  <li className="ms-3">
                    <button className="text-muted bg-transparent border-0">
                      <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                    </button>
                  </li>
                  <li className="ms-3">
                    <button
                      className="text-muted bg-transparent border-0"
                      onClick={handleGoogleRegister}
                    >
                      <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-100 align-self-end">
              <p className="nav d-block fs-xs text-center text-xl-start pb-2 mb-0">
                &copy;2024, All rights reserved.
                <Link
                  className="nav-link d-inline-block p-0"
                  href="/"
                  target="_blank"
                  rel="noopener"
                >
                  Chimera
                </Link>
              </p>
            </div>
          </div>

          <div
            className="position-relative mt-3 position-absolute top-0 end-0 w-50 d-none d-xl-block"
            style={{
              backgroundImage: 'url(../../images/hero/hero4.png)',
              height: '90vh',
              backgroundSize: 'cover',
              borderRadius: '10px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
            }}
          >
            <div
              id="typewriter"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                fontSize: '2rem',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
{
  /*


// resgiter page
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect/dist/core';

const Register = () => {
  // Type effect
  useEffect(() => {
    // Typewriter effect initialization
    const typewriter = new Typewriter('#typewriter', {
      strings: ['Welcome to Chimera AI', 'Revolutionizing Business Management'],
      autoStart: true,
      loop: true,
      delay: 75,
    });
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords must match.');
      } else if (
        name === 'password' &&
        formData.confirmPassword !== '' &&
        value !== formData.confirmPassword
      ) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }

      if (name === 'password') {
        const passwordStrengthMessage = validatePasswordStrength(value);
        setPasswordStrengthError(passwordStrengthMessage);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/users',
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        }

        setSuccessMessage('Registration successful!');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  const handleFacebookRegister = () => {
    const facebookOAuthURL = 'http://localhost:3001/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };
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
      <div className=" h-100">
        <div className="mt-5 h-100">
          <div className="container d-flex flex-wrap justify-content-center justify-content-lg-start mt-5">
            <div className=" pt-1 pt-md-4 pb-4">
              <div className=" justify-content-center">
                <Link className="text-center nav-link text-underlined" href="/">
                  back to menu
                </Link>
                <h1 className="text-center">Register</h1>
                <p className="text-center  pb-3 mb-3">
                  Already have an account?{' '}
                  <Link className="text-dark" href="/login/login">
                    <small>login here</small>
                  </Link>
                </p>
                <hr className="my-4" />
                <ul className="nav justify-content-center list-unstyled d-flex pt-1 mt-3 h-100">
                  <form className="form text-center" onSubmit={handleSubmit}>
                    <input
                      className="form-control m-2 fw-bold"
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                    />
                    <input
                      className="form-control m-2 fw-bold"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
                    <input
                      className={`form-control m-2 fw-bold ${
                        passwordError || passwordStrengthError
                          ? 'is-invalid'
                          : ''
                      }`}
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                    />
                    <input
                      className={`form-control m-2 fw-bold ${
                        passwordError ? 'is-invalid' : ''
                      }`}
                      required
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                    {passwordError && (
                      <p className="text-danger fw-bold">{passwordError}</p>
                    )}
                    {passwordStrengthError && (
                      <p className="text-danger fw-bold">
                        {passwordStrengthError}
                      </p>
                    )}
                    <div className="container">
                      <button className="w-100 btn btn-md" type="submit">
                        Register
                      </button>
                      <h6 className="text-muted pt-3">or register with</h6>

                      <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
                        <li className="ms-3">
                          <button className="text-muted bg-transparent border-0">
                            <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                          </button>
                        </li>
                        <li className="ms-3">
                          <button
                            className="text-muted bg-transparent border-0"
                            onClick={handleGoogleRegister}
                          >
                            <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
                    {successMessage && (
                      <p className="text-success">{successMessage}</p>
                    )}
                  </form>

                  <li className="ms-3">
                    <button className="text-muted bg-transparent border-0">
                      <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                    </button>
                  </li>
                  <li className="ms-3">
                    <button
                      className="text-muted bg-transparent border-0"
                      onClick={handleGoogleRegister}
                    >
                      <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-100 align-self-end">
              <p className="nav d-block fs-xs text-center text-xl-start pb-2 mb-0">
                &copy;2024, All rights reserved.
                <Link
                  className="nav-link d-inline-block p-0"
                  href="/"
                  target="_blank"
                  rel="noopener"
                >
                  Chimera
                </Link>
              </p>
            </div>
          </div>

          <div
            className="position-relative mt-3 position-absolute top-0 end-0 w-50 d-none d-xl-block"
            style={{
              backgroundImage: 'url(../../images/hero/hero4.png)',
              height: '90vh',
              backgroundSize: 'cover',
              borderRadius: '10px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
            }}
          >
            
            <div
              id="typewriter"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                fontSize: '2rem',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

*/
}
