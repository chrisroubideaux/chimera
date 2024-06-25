// test compoent for date picker
// Breadcrumb componet

import Link from 'next/link';
import CreateEvent from './CreateEvent';

export default function Tab() {
  return (
    <div>
      <div className="row align-items-center">
        <div className="col">
          <div className="d-none d-lg-block">
            <h1 className="h2">Personal info</h1>
          </div>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-light mb-0">
              <li className="breadcrumb-item">Account</li>
              <li className="breadcrumb-item active" aria-current="page">
                Personal Info
              </li>
            </ol>
          </nav>
        </div>
        <ul className="nav justify-content-end mt-3">
          <li className="nav-item">
            <CreateEvent />
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/"></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
