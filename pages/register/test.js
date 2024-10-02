import Head from 'next/head';
import Link from 'next/link';

export default function Register() {
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
        <title>Chimera</title>
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

      <div className="">
        <div className="container d-flex flex-wrap justify-content-center justify-content-lg-start py-5">
          <div className="pt-1 pt-md-4 pb-4 py-3">
            <div className="text-center text-md-start">
              <div className="mb-6 pe-xl-8">
                <div className="container">
                  <h1 className="fs-1 text-bold">Chimera AI</h1>
                  <div className="row align-items-center py-lg-8">
                    <div className="col-md-6 col-12">
                      <p className="">
                        Chimera AI is a cutting-edge application designed to
                        streamline business operations by tracking sales and
                        automating inventory management. By leveraging advanced
                        AI techniques such as machine learning and deep
                        learning, Chimera provides accurate sales projections,
                        helping businesses stay ahead of market trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-7">
                <div className="mb-3">
                  <button className="text-muted bg-transparent border-0">
                    <i className="social-icons fs-1 fa-brands fa-facebook mt-1"></i>
                  </button>

                  <button
                    className="text-muted bg-transparent border-0"
                    type="button"
                    onClick={handleGoogleRegister}
                  >
                    <i className="social-icons fs-1 fa-brands fa-google mt-1"></i>
                  </button>
                </div>
                <small>📣 30-Day Money Back Guarantee</small>
              </div>
            </div>
          </div>
          <div className="w-100 align-self-end py-3">
            <p className="nav d-block fs-xs text-center text-xl-start pb-2 mb-0 ">
              &copy;2024, All rights reserved.
              <Link
                className="nav-link d-inline-block p-0"
                href="https://createx.studio/"
                target="_blank"
                rel="noopener"
              >
                Chimera.com
              </Link>
            </p>
            {/*test*/}

            <div className="d-flex mt-3 m-2">
              <Link href="/" className=" me-1">
                <i className="social-icons fa-brands fa-facebook mt-1"></i>
              </Link>

              <Link href="#!" className=" me-2">
                <i className="social-icons fa-brands fa-linkedin mt-1"></i>
              </Link>
              <Link href="https://github.com/chrisroubideaux" className="me-2">
                <i className="social-icons fa-brands fa-github mt-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" mt-3 position-absolute top-0 end-0 w-50 
        d-none d-xl-block"
        style={{
          backgroundImage: 'url(../../images/hero/hero.png)',
          height: '90vh',
          backgroundSize: 'cover',
          borderRadius: '10px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%) ',
        }}
      ></div>
    </>
  );
}