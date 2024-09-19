// amenties component

function Bio({ employees }) {
  return (
    <div className="card me-3">
      <ul className="list-group pt-2 pb-4 m-4">
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons  fa-solid fa-envelope me-2"></i>
          {employees.email}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons fa-solid fa-phone me-2"></i>
          {employees.phone}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons fa-solid fa-person me-2"></i>
          {employees.title}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons fa-solid fa-shop me-2"></i>
          {employees.dept}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons fa-solid fa-briefcase me-2"></i>
          Exp:{employees.experience}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="social-icons fa-solid fa-calendar me-2"></i>
          Hired:{employees.hireDate}
        </h6>
      </ul>
    </div>
  );
}

export default Bio;
