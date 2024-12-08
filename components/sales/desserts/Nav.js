export default function Nav({ setActiveComponent }) {
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sales
        </button>

        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('DessertsHourlyChart')}
            >
              Hourly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('DessertsDailyChart')}
            >
              Daily
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('DessertsWeeklyChart')}
            >
              Weekly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('DessertsMonthlyChart')}
            >
              Monthly
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
