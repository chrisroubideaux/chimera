import {
  FaTemperatureHigh,
  FaPumpSoap,
  FaPizzaSlice,
  FaDumbbell,
  FaTshirt,
  FaKey,
  FaWheelchair,
  FaPaw,
} from 'react-icons/fa';

function Sales({ drink, produce }) {
  return (
    <ul className="list-group pt-2 pb-4 m-4 ">
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaTemperatureHigh className="card-icon me-2 fs-5" />
        Units: {drink?.unit || produce?.unit}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaPumpSoap className="card-icon me-2 fs-5" />
        Count: {drink?.count || produce?.count}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaDumbbell className="card-icon me-2 fs-5" />
        Items Sold: {drink?.sold || produce?.sold}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTshirt className="card-icons me-2 fs-5" />
        Par: {drink?.par || produce?.par}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaKey className="card-icon me-2 fs-5" />
        Projected: {drink?.projected || produce?.projected}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaWheelchair className="card-icon me-2 fs-5" />
        Actual: {drink?.actual || produce?.actual}
      </h6>
    </ul>
  );
}

export default Sales;

{
  /*
import {
  FaTemperatureHigh,
  FaPumpSoap,
  FaPizzaSlice,
  FaDumbbell,
  FaTshirt,
  FaKey,
  FaWheelchair,
  FaPaw,
} from 'react-icons/fa';

function Sales({ drink, produce }) {
  return (
    <ul className="list-group pt-2 pb-4 m-4 ">
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaTemperatureHigh className="card-icon me-2 fs-5" />
        Units: {drink?.unit || produce?.unit}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaPumpSoap className="card-icon me-2 fs-5" />
        Count: {drink?.count || produce?.count}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaDumbbell className="card-icon me-2 fs-5" />
        Items Sold: {drink?.sold || produce?.sold}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTshirt className="card-icons me-2 fs-5" />
        Par: {drink?.par || produce?.par}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaKey className="card-icon me-2 fs-5" />
        Projected: {drink?.projected || produce?.projected}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaWheelchair className="card-icon me-2 fs-5" />
        Actual: {drink?.actual || produce?.actual}
      </h6>
    </ul>
  );
}

export default Sales;
*/
}
