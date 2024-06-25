// Tab component

import Link from 'next/link';
import CreateEvent from './CreateEvent';

export default function Tab() {
  return (
    <div>
      <ul className="nav justify-content-end mt-3 ">
        <li className="nav-item">
          <CreateEvent />
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/"></Link>
        </li>
      </ul>
    </div>
  );
}
