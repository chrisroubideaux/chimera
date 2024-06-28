// Request form component

export default function Form({}) {
  return (
    <div className="mt-4 card py-3">
      <h6 className="fw-nomral text-center">Time off request</h6>

      <form className="form text-center">
        <input
          className="form-control fw-bold"
          required
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
        />

        <div className="mt-2">
          <select
            className="form-select fw-bold"
            aria-label="Default select example"
          >
            <option className="" selected>
              Request Type
            </option>
            <option value="2">Vaction</option>
            <option value="3">P.T.O</option>
            <option value="3">Personal</option>
          </select>

          <div className="mt-2">
            <input
              className="form-control fw-bold"
              required
              type="text"
              name="Duration"
              placeholder="From 00/00/00"
            />
          </div>
          <div className="mt-2">
            <input
              className="form-control fw-bold"
              required
              type="text"
              name="Duration"
              placeholder="To 00/00/00"
            />
          </div>
        </div>
        <div className="mt-5">
          <a className="btn btn lg w-75" href="/login">
            Submit
          </a>
        </div>
      </form>
    </div>
  );
}
