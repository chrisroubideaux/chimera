// starters
const starters = [
  {
    id: '1',
    category: 'Starters',
    name: 'Bruschetta',
    image: '/images/appetizers/brushetta.png',
    description:
      ' Four Grilled crostinis served with with shaved fillet & fresh arugula tossed in house made lemon ailoi topped with shaved parmesan.',
    price: '17',
    count: '120,orders',
    par: '120',
    options: [
      {
        sauce: 'Lemon Aioli',
        choices: [
          'Lemon Aioli',
          'No Aioli',
          'Extra Aioli',
          'Extra Parmesan',
          'No Parmesan',
          'No Arugula',
          'Extra Arugula',
          'Light Arugula',
        ],
      },
      {
        method: 'Tossed in Lemon Aioli',
      },
    ],
  },
  {
    id: '2',
    category: 'Starters',
    name: 'Chicken Wings',
    image: '/images/appetizers/wings.png',
    description:
      'Chicken wings tossed in your choice of one of our house made sauce served with your choice of ranch or blue cheese.',
    price: '15',
    price: '14',
    count: '3 lexons',
    par: '3',
    options: [
      {
        sauce: 'Buffalo, BBQ, Korean BBG',
        quantity: '1/2 lb',
        quantity: '1 lb',
        choices: [
          'House made Buffalo',
          'House made BBQ',
          'Korean BBQ',
          'Garlic Parmesan',
          'Sauce on side',
          'No Sauce',
          'Extra Sauce',
        ],
      },
      {
        choices: ['Ranch', 'Blue Cheese'],
      },
    ],
  },
  {
    id: '3',
    category: 'Starters',
    name: 'Pork boa bun sliders',
    image: '/images/appetizers/sliders.png',
    description:
      'Steamed house made boa buns filled with top noch pork belly, with pickled cucumber, & house made korean bbq sauce.',
    price: '17',
    count: '20 orders',
    par: '20',
    options: [
      {
        quantity: '3 sliders',
        choices: ['Korean BBQ', 'Sauce on side', 'No Sauce', 'Extra Sauce'],
      },
      {
        choices: ['Korean BBQ', 'Soy Sauce', 'Sweet Chili'],
      },
    ],
  },
  {
    id: '4',
    category: 'Starters',
    image: '/images/appetizers/potstickers.png',
    name: 'Pork potstickers',
    description:
      'House made pork potstickers served with house made soy sauce and house made sweet chili sauce.',
    price: '15',
    count: '48',
    par: '56',
    options: [
      {
        quantity: '6 potstickers',
        sauce: 'Soy Sauce, Sweet Chili',
        choices: [
          'Soy Sauce',
          'Sweet Chili',
          'Sauce on side',
          'No Sauce',
          'Extra Sauce',
        ],
      },
    ],
  },
];

export default starters;
