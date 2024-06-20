// form component

export default function Form() {
  return (
    <>
      <div>
        <select class="form-select" aria-label="Default select example">
          <option selected>Create Event</option>
          <option value="1">Video Call</option>
          <option value="2">Meeting</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="mt-2">
        <select class="form-select" aria-label="Default select example">
          <option selected>Select Time</option>
          <option value="1">Video Call</option>
          <option value="2">Meeting</option>
          <option value="3">Three</option>
        </select>
      </div>
    </>
  );
}
