// entrees
const entrees = [
  {
    id: '1',
    category: 'Entrees',
    name: '12oz Ribeye',
    image: '/images/entrees/ribeye.png',
    description:
      '12oz ribeye served with broccolini and choice of baked or loaded mashed potato.',
    price: '38',
    count: '5',
    par: '3',
    options: [
      {
        sides: ['Broccolini', 'Baked Potato', 'Loaded Mashed Potato'],
      },
    ],
  },
  {
    id: '2',
    category: 'Entrees',
    name: 'Rack of Lamb',
    image: '/images/entrees/rack_of_lamb.png',
    description:
      'Rack of lamb served with mashed potato and choice of broccolini, brussels sprouts, or green beans served with demi-glaze.',
    price: '45',
    count: '5',
    par: '6',
    options: [
      {
        sides: [
          'Mashed Potato',
          'Broccolini',
          'Brussels Sprouts',
          'Green Beans',
        ],
      },
      {
        sauce: 'Demi-glaze',
      },
    ],
  },
  {
    id: '3',
    category: 'Entrees',
    name: '10oz Salmon',
    image: '/images/entrees/salmon.png',
    description: '10oz salmon served with asparagus and lemon butter sauce.',
    price: '28',
    count: '5',
    par: '5',
    options: [
      {
        sides: ['Asparagus'],
        sauce: 'Lemon Butter Sauce',
      },
    ],
  },
  {
    id: '4',
    category: 'Entrees',
    name: 'Osso Buco',
    image: '/images/entrees/osso_buco.png',
    description: 'Osso Buco served with risotto.',
    price: '42',
    count: '5',
    par: '8',
    options: [
      {
        sides: ['Risotto'],
      },
    ],
  },
  {
    id: '5',
    category: 'Entrees',
    name: 'Beef Short Rib',
    image: '/images/entrees/beef_short_rib.png',
    description: 'Beef short rib served with polenta.',
    price: '25',
    count: '5',
    par: '7',
    options: [
      {
        sides: ['Polenta'],
      },
    ],
  },
  {
    id: '6',
    category: 'Entrees',
    name: 'Double Cheeseburger',
    image: '/images/entrees/double_cheeseburger.png',
    description:
      'House made double cheeseburger with house bacon and BBQ sauce served with fries.',
    price: '15',
    count: '5',
    par: '6',
    options: [
      {
        sides: ['Fries'],
        sauce: 'BBQ Sauce',
      },
    ],
  },
];

export default entrees;
