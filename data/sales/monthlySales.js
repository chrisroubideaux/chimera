// Overall monthly sales

const monthlySales = [
  {
    type: 'labels',
    data: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  {
    type: 'datasets',
    data: [
      {
        label: 'Projected',
        data: [181, 200, 190, 190, 200, 215, 220, 250, 260, 270, 280, 290],
        borderColor: 'rgb(126, 142, 241)',
        backgroundColor: 'rgb(177, 188, 255)',
      },
      {
        label: 'Actual',
        data: [230, 240, 195, 200, 210, 230, 240, 260, 270, 280, 290, 300],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Monthly Average',
        data: [200, 210, 205, 205, 215, 225, 230, 255, 260, 270, 280, 290],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        type: 'line',
        tension: 0.1,
      },
    ],
  },
];

export default monthlySales;
