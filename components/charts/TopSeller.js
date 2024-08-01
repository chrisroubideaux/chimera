// Top seller component

export default function TopSeller() {
  return (
    <div className="card">
      <div className="d-flex card-header justify-content-between align-items-center">
        <h4 className="header-title">Top Selling Products</h4>
        <a href="javascript:void(0);" className="btn btn-sm btn-light">
          Export <i className="fa-solid fa-download"></i>
        </a>
      </div>
      <div className="card-body pt-0">
        <div className="table-responsive">
          <table className="table table-centered table-nowrap table-hover mb-0">
            <tbody>
              <tr>
                <td className="">
                  <h5 className=" my-1 fw-normal">Test Products</h5>
                  <span className="text-muted">Add current date here</span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">$28.49</h5>
                  <span className="text-muted font-13">Price</span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">69</h5>
                  <span className="text-muted font-13">Quantity</span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">$1,965.81</h5>
                  <span className="text-muted font-13">Amount</span>
                </td>
              </tr>

              <tr>
                <td>
                  <h5 className="font-14 my-1 fw-normal">Test Products</h5>
                  <span className="text-muted font-13">
                    Add current date here
                  </span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">$28.49</h5>
                  <span className="text-muted font-13">Price</span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">69</h5>
                  <span className="text-muted font-13">Quantity</span>
                </td>
                <td>
                  <h5 className="font-14 my-1 fw-normal">$1,965.81</h5>
                  <span className="text-muted font-13">Amount</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
