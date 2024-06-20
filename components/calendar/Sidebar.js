// sidebar component for calendar page
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 sidebar "
        style={{ width: '380px' }}
      >
        <h6 className="mt-3">
          Upcoming events
          <span className="badge bg-success bg-opacity-10 text-success me-2">
            5
          </span>
        </h6>
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-3 align-items-center justify-content-center">
          <div className="list-group px-3 " style={{ width: '380px' }}>
            <Link
              href="#"
              className="list-group-item list-group-item-action d-flex gap-3 py-3"
              aria-current="true"
            >
              <img
                src="https://github.com/twbs.png"
                alt="twbs"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0"
              />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">List group item heading</h6>

                  <p className="mb-0 opacity-75">This is a test message.</p>
                </div>
                <small className="opacity-50 text-nowrap">now</small>
              </div>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action d-flex gap-3 py-3"
              aria-current="true"
            >
              <img
                src="https://github.com/twbs.png"
                alt="twbs"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0"
              />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">Another title here</h6>
                  <p className="mb-0 opacity-75">This is a test message...</p>
                </div>
                <small className="opacity-50 text-nowrap">3d</small>
              </div>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action d-flex gap-3 py-3"
              aria-current="true"
            >
              <img
                src="https://github.com/twbs.png"
                alt="twbs"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0"
              />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">Third heading</h6>
                  <p className="mb-0 opacity-75">This is a test message...</p>
                </div>
                <small className="opacity-50 text-nowrap">1w</small>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
