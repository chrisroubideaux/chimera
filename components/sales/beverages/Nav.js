// Nav component
export default function Nav({ setActiveComponent }) {
  return (
    <div>
      <div className="dropdown">
        <button type="button" className="btn btn-sm me-2">
          <i className="fa-solid fa-download"></i> Export
        </button>
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
              onClick={() => setActiveComponent('BeverageHourlyChart')}
            >
              Hourly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('BeverageDailyChart')}
            >
              Daily
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('BeverageWeeklyChart')}
            >
              Weekly
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setActiveComponent('BeverageMonthlyChart')}
            >
              Monthly
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
