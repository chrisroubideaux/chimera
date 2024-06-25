// Schedule component
import { format } from 'date-fns';
export default function Schedule() {
  const today = format(new Date(), 'MM/dd/yyyy');

  return (
    <div className="mt-3">
      <div className="box d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center">
        <div className="list-group" style={{ width: '50rem' }}>
          <h6 className="fw-bold d-flex px-1">Upcoming Shifts: {today}</h6>

          <label className="list-group-item d-flex gap-3">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5 ">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
          <label className="list-group-item d-flex gap-3">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
          <label className="list-group-item d-flex gap-3">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
          <label className="list-group-item d-flex gap-3 bg-body-tertiary">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
          <label className="list-group-item d-flex gap-3 bg-body-tertiary">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
          <label className="list-group-item d-flex gap-3 bg-body-tertiary">
            <span className="pt-1 form-checked-content">
              <strong className="d-flex me-5">06/25/2024</strong>
              <h5 className="d-block  ">
                <i className="social-icon fa-solid fa-calendar-days me-1 "></i>
                Monday: 1:00–2:00pm
              </h5>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
