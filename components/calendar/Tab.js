// Tab component

import Link from 'next/link';
import CreateEvent from './CreateEvent';

export default function Tab() {
  return (
    <div>
      <ul className="nav justify-content-end mt-3 me-4">
        <li className="nav-item me-2">
          <CreateEvent />
        </li>
        <li className="nav-item">
          <Link className=" btn btn-sm" href="/admin/admin">
            Admin
            <i className=" m-1 fa-solid fa-person"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
