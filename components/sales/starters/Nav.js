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
              onClick={() => setActiveComponent('StarterHourlyChart')}
            >
              Hourly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('StarterDailyChart')}
            >
              Daily
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('StarterWeeklyChart')}
            >
              Weekly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('StarterMonthlyChart')}
            >
              Monthly
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
