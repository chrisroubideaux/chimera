// Nav for starters

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
              onClick={() => setActiveComponent('EntreeHourlyChart')}
            >
              Hourly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('EntreeDailyChart')}
            >
              Daily
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('EntreeWeeklyChart')}
            >
              Weekly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('EntreeMonthlyChart')}
            >
              Monthly
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
