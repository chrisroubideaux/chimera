// Footer component
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="pt-5 mt-5">
      <footer className="mt-lg-7 pt-7">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="row" id="ft-links">
                <div className="col-lg-3 col-12">
                  <div className="position-relative">
                    <div className="mb-3 pb-2 d-flex justify-content-between border-dark-subtle border-bottom border-bottom-lg-0">
                      <h4 className="">Services</h4>
                      <a
                        className="d-block d-lg-none stretched-link text-body"
                        data-bs-toggle="collapse"
                        href="#collapseLanding"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseLanding"
                      >
                        <i className=" social-icons fa-solid fa-chevron-down"></i>
                      </a>
                    </div>
                    <div
                      className="collapse d-lg-block"
                      id="collapseLanding"
                      data-bs-parent="#ft-links"
                    >
                      <ul className="list-unstyled mb-0 py-3 py-lg-0">
                        <li className="mb-2">
                          <a
                            href="../index.html"
                            className="text-decoration-none text-body-secondary"
                          >
                            Sales Automation
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Inventory Automation
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Meetings/Video
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Automate Schedules
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Automate Orders
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div>
                    <div className="mb-3 pb-2 d-flex justify-content-between border-dark-subtle border-bottom border-bottom-lg-0 position-relative">
                      <h4 className="">About us</h4>
                      <a
                        className="d-block d-lg-none stretched-link text-body"
                        data-bs-toggle="collapse"
                        href="#collapseAccounts"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseAccounts"
                      >
                        <i className=" social-icons fa-solid fa-chevron-down"></i>
                      </a>
                    </div>
                    <div
                      className="collapse d-lg-block"
                      id="collapseAccounts"
                      data-bs-parent="#ft-links"
                    >
                      <ul className="list-unstyled mb-0 py-3 py-lg-0">
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Case Studies
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Blog
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Services
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            About
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="#!"
                            className="text-decoration-none text-body-secondary"
                          >
                            Career
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="mb-3 pb-2 d-flex justify-content-between border-dark-subtle border-bottom border-bottom-lg-0 position-relative">
                    <h4 className="">Technology</h4>
                    <a
                      className="d-block d-lg-none stretched-link text-body"
                      data-bs-toggle="collapse"
                      href="#collapseResources"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseResources"
                    >
                      <i className=" social-icons fa-solid fa-chevron-down"></i>
                    </a>
                  </div>
                  <div
                    className="collapse d-lg-block"
                    id="collapseResources"
                    data-bs-parent="#ft-links"
                  >
                    <ul className="list-unstyled mb-0 py-3 py-lg-0">
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Next.js
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Redux
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Node.js
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Mongo.DB
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Python
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Google Colab
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/** */}
                <div className="col-lg-3 col-12">
                  <div className="mb-3 pb-2 d-flex justify-content-between border-dark-subtle border-bottom border-bottom-lg-0 position-relative">
                    <h4 className="">Locations</h4>
                    <a
                      className="d-block d-lg-none stretched-link text-body"
                      data-bs-toggle="collapse"
                      href="#collapseLocations"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseLocations"
                    >
                      <i className="bi bi-chevron-down"></i>
                    </a>
                  </div>
                  <div
                    className="collapse d-lg-block"
                    id="collapseLocations"
                    data-bs-parent="#ft-links"
                  >
                    <ul className="list-unstyled mb-0 py-3 py-lg-0">
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Midwest USA
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          East Coast, USA
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          West Coast, USA
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#"
                          className="text-decoration-none text-body-secondary"
                        >
                          Down South, USA
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* */}
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="me-7">
                <h4 className=" mb-4">Headquarters</h4>
                <p className="text-body-secondary">
                  0110 Alan Turning DR, Machine City, GPU 100101
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-7 pt-lg-7 pb-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-3">
              <a className="mb-4 mb-lg-0 d-block" href="../index.html">
                <img src="../assets/images/logo/logo-white.svg" alt="" />
              </a>
            </div>
            <div className="col-md-9 col-lg-6">
              <div className="small mb-3 mb-lg-0 text-lg-center">
                Copyright © 2025
                <span className="">
                  <Link className="card-link" href="#">
                    Chimera AI
                  </Link>
                </span>
                Built by
                <span className="me-2">
                  <Link className="card-link me-2" href="#">
                    Digi Wraith
                  </Link>
                </span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-md-end">
                <Link href="/" className=" me-1">
                  <i className="social-icons fa-brands fa-facebook mt-1"></i>
                </Link>
                <Link href="#" className=" me-2">
                  <i className="social-icons fa-brands fa-linkedin mt-1"></i>
                </Link>
                <Link
                  href="https://github.com/chrisroubideaux"
                  className="me-2"
                >
                  <i className="social-icons fa-brands fa-github mt-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
