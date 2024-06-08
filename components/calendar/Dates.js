// components/Dates.js

import { format } from 'date-fns';

export default function Dates() {
  const today = format(new Date(), 'MM/dd/yyyy');

  return (
    <form className="d-flex" style={{ width: '14rem' }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          id="dash-daterange"
          value={today}
          readOnly
        />
        <button className="input-group-text bg-sm">
          <i className="social-icon fa-solid fa-calendar-days"></i>
        </button>
      </div>
    </form>
  );
}

{
  /*<form className="d-flex" style={{ width: '15rem' }}>
      <div className="input-group">
        <input type="text" className="form-control" id="dash-daterange" />
        <span className="input-group-text bg-sm">
          <i className="social-icon fa-solid fa-calendar-days"></i>
        </span>
      </div>
    </form> */
}
