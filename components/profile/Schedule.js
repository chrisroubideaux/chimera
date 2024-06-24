// Schedule component

export default function Schedule() {
  return (
    <div className="mt-3">
      <div class="box d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center ">
        <div class="list-group" style={{ width: '50rem' }}>
          <label class="list-group-item d-flex gap-3">
            <span class="pt-1 form-checked-content">
              <strong>Your Next Shift</strong>
              <h5 class="d-block ">
                <i className="social-icon fa-solid fa-calendar-days me-2"></i>
                1:00–2:00pm
              </h5>
            </span>
          </label>
          <label class="list-group-item d-flex gap-3">
            <span class="pt-1 form-checked-content">
              <strong>Weekly All Hands</strong>
              <small class="d-block text-body-secondary">
                <i className="social-icon fa-solid fa-calendar-days"></i>
                2:00–2:30pm
              </small>
            </span>
          </label>
          <label class="list-group-item d-flex gap-3">
            <span class="pt-1 form-checked-content">
              <strong>Out of office</strong>
              <small class="d-block text-body-secondary">
                <i className="social-icon fa-solid fa-calendar-days"></i>
                Tomorrow
              </small>
            </span>
          </label>
          <label class="list-group-item d-flex gap-3 bg-body-tertiary">
            <span class="pt-1 form-checked-content">
              <span contenteditable="true" class="w-100">
                Add new task...
              </span>
              <small class="d-block text-body-secondary">
                <i className="social-icon fa-solid fa-calendar-days"></i>
                Choose list...
              </small>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
