// card component for employees
import Link from 'next/link';
import Image from 'next/image';

export default function Card({ employees }) {
  return (
    <>
      <Link className="card-link" href={`/team/${employees._id}`}>
        <div className="card mb-2" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-sm-4">
              <Image
                src={employees.image}
                width={120}
                height={120}
                className="media mx-3 my-3"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                  {employees.name}
                </h5>
                <span className="d-inline-block ">
                  <h6 className=" fs-sm fw-normal">
                    <i className="fs-6 social-icons fa-solid fa-envelope me-1"></i>
                    {employees.email}
                  </h6>
                </span>
                <div
                  className="card-footer d-flex text-nowrap m-auto"
                  style={{ maxWidth: '55rem' }}
                >
                  <span className=" d-inline-block me-1">
                    <h6 className="fw-normal">
                      <i className="social-icons fs-6 fa-solid fa-phone me-1"></i>
                      {employees.phone}
                    </h6>
                  </span>
                  <span className="d-inline-block me-2">
                    <h6 className=" fs-sm fw-normal">
                      <i className="fs-6 social-icons fa-solid fa-briefcase me-1"></i>
                      exp: {employees.experience}
                    </h6>
                  </span>
                  <span className="d-inline-block">
                    <h6 className=" fs-sm fw-normal">
                      <i className="fs-6 social-icons fa-solid fa-briefcase me-1"></i>
                      Title: {employees.title}
                    </h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
