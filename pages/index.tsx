/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
                  <Link href="/menu/menu" className="btn btn-md me-2">
                    Try for free
                  </Link>
                  <button
                    type="button"
                    className="btn btn-md"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    How it works
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            How Chimera Works
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p className="">
                            Chimera AI is a cutting-edge application designed to
                            streamline business operations by tracking sales and
                            automating inventory management. By leveraging
                            advanced AI techniques such as machine learning and
                            deep learning, Chimera provides accurate sales
                            projections, helping businesses stay ahead of market
                            trends. The app also automates the ordering process
                            to ensure optimal inventory levels, reducing the
                            risk of stockouts or overstocking. Additionally,
                            Chimera offers seamless team collaboration features,
                            allowing users to book meetings, setup video calls
                            and coordinate efforts efficiently. With its
                            comprehensive suite of tools, Chimera is the
                            ultimate solution for enhancing productivity and
                            driving business growth.
                          </p>
                        </div>
                        <div className="modal-footer">
                          <Link href="/menu" className="btn btn-md">
                            View Demo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <i
                  className="social-icons fa-brands fa-facebook mt-1"
               
                ></i>
              </Link>

              <Link href="#!" className=" me-2">
                <i
                  className="social-icons fa-brands fa-linkedin mt-1"
               
                ></i>
              </Link>
              <Link href="https://github.com/chrisroubideaux" className="me-2">
                <i
                  className="social-icons fa-brands fa-github mt-1"
                
                ></i>
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
