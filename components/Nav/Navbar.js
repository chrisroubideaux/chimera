// Navbar component
import Link from 'next/link';
//import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <Link className=" fs-4 fw-bold nav-link" href="/">
            Chimera
          </Link>

          <div className="nav justify-content-center pt-2">
            <div className="input-group mb-3 m-1" style={{ width: '20rem' }}>
              <input
                type="text"
                className="form-control text-dark fw-normal"
                aria-label="Text input with dropdown button"
                placeholder="Search"
                //   value={query}
                //  onChange={handleQueryChange}
              />
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                //  onClick={handleSearch}
              >
                <span className="">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </button>
            </div>
          </div>
          <button
            className="fs-4 btn btn-sm bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="">
              <i className="social-icons fas fa-align-right"></i>
            </span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="fw-bold" id="offcanvasNavbarLabel">
                Chimera
              </h5>
              <button
                className="btn-close mt-1"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <i className="social-icons fa-solid fa-x"></i>
              </button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 fw-semi-bold">
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fs-5 fa-solid fa-house me-3"></i>
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fs-5 fa-solid fa-folder-tree me-3"></i>
                  <Link className="nav-link" href="/menu/menu">
                    Menu
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fs-5 fa-solid fa-calculator me-3"></i>
                  <Link className="nav-link" href="/calculator/calculator/">
                    Calculator
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fs-5 fa-solid fa-globe me-3"></i>
                  <Link className="nav-link" href="/about/about/">
                    About
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fs-5 fa-solid fa-person-walking me-3"></i>
                  <Link className="nav-link" href="/register/Register">
                    Register
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <i className="social-icons fa-solid fa-person-walking-arrow-loop-left fs-5 me-3"></i>
                  <Link className="nav-link" href="/login/login/">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
