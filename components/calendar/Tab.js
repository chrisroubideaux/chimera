// tab component
import Link from 'next/link';
import TestEvent from './TestEvent';

export default function Tab() {
  return (
    <div>
      <ul className="nav justify-content-end mt-3">
        <li className="nav-item">
          <TestEvent />
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/"></Link>
        </li>
      </ul>
    </div>
  );
}
