// Bev details component
export default function Details({ drink, produce }) {
  return (
    <div>
      <h3 className="dark-text text-center">
        {drink?.name || produce?.name || 'loading'}
      </h3>
    </div>
  );
}

{
  /*
export default function Details({ drink }) {
  return (
    <div>
     
      <h3 className="dark-text">{drink?.name || 'loading'}</h3>
    </div>
  );
}
*/
}
