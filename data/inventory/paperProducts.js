// papaer products
const paperProducts = [
  {
    id: '1',
    category: 'Napkins',
    name: 'Standard Napkins',
    description:
      'High-quality paper napkins for everyday use. Absorbent and durable, ideal for casual dining.',
    price: '37',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '2',
    category: 'Togo Boxes',
    name: 'Standard Togo Box',
    description:
      'Durable to-go box for packing food. Suitable for a variety of menu items. Available in multiple sizes.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '3',
    category: 'Togo Silverware',
    name: 'Plastic Silverware Set',
    description:
      'Disposable plastic silverware set including fork, knife, and spoon. Perfect for takeout and to-go orders.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '4',
    category: 'Togo Soup Cups',
    name: '4 oz Plastic Soup Cup',
    description:
      'Small plastic soup cup for hot or cold soups. Comes with a secure lid to prevent spills.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '5',
    category: 'Togo Soup Cups',
    name: '6 oz Plastic Soup Cup',
    description:
      'Medium-sized plastic soup cup for hot or cold soups. Includes a tight-fitting lid.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '6',
    category: 'Togo Soup Cups',
    name: '8 oz Plastic Soup Cup',
    description:
      'Large plastic soup cup for generous servings of hot or cold soups. Equipped with a secure lid.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '7',
    category: 'Ramekins',
    name: '4 oz Plastic Ramekin with Lid',
    description:
      'Small plastic ramekin with lid, ideal for sauces, dressings, or small sides. Leak-proof and convenient.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '8',
    category: 'Paper Products',
    name: 'Paper Towels',
    description:
      'Highly absorbent paper towels for cleaning and drying. Essential for maintaining a clean kitchen environment.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '9',
    category: 'Paper Products',
    name: 'Toilet Paper',
    description:
      'Soft and durable toilet paper for restrooms. Provides comfort and efficiency.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '10',
    category: 'Paper Products',
    name: 'Printer Paper',
    description:
      'Standard white printer paper suitable for all office printing needs. Comes in reams of 500 sheets.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '11',
    category: 'Paper Products',
    name: 'Paper Bags',
    description:
      'Eco-friendly paper bags for takeout and carryout. Available in various sizes for different needs.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '12',
    category: 'Paper Products',
    name: 'Menu Paper',
    description:
      'High-quality paper used for printing restaurant menus. Durable and resistant to wear and tear.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '13',
    category: 'Paper Products',
    name: 'Grease-Resistant Paper',
    description:
      'Specialized paper for wrapping fried or greasy foods. Helps to maintain food quality and prevent leaks.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
  {
    id: '14',
    category: 'Paper Products',
    name: 'Food Wrapping Paper',
    description:
      'Paper used for wrapping sandwiches, burgers, and other menu items. Provides a clean and professional presentation.',
    price: '30',
    unit: 'case',
    count: '1',
    sold: '0',
    par: '2',
    projected: '2',
    actual: '0',
    date: '00/00/00',
    time: '1:00pm',
    WeeklySales: {},
    MonthlySales: {},
  },
];

export default paperProducts;
