// photo component
import Image from 'next/image';

function Bio({ employees }) {
  return (
    <div className="">
      <Image
        src={employees.image}
        className="d-block mx-lg-auto img-fluid image"
        alt="img"
        width={600}
        height={600}
        loading="lazy"
      />
    </div>
  );
}

export default Bio;
