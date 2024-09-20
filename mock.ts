// function to validate the data
export const dataEmpty = [];
export const dataOne = [
  {
    id: 1,
    day: 'friday',
    active: true,
    status: 'scheduled',
    date: '09-27-2024',
    interval: 2,
  },
];
export const dataTwo = [
  {
    id: 1,
    day: 'friday',
    active: true,
    status: 'scheduled',
    date: '09-27-2024',
  },
  {
    id: 2,
    day: 'friday',
    active: true,
    status: 'scheduled',
    date: '10-04-2024',
  },
];
export const dataTwoButOneInactive = [
  {
    id: 1,
    day: 'friday',
    active: false,
    status: 'picked_up',
    date: '09-27-2024',
  },
  {
    id: 2,
    day: 'friday',
    active: true,
    status: 'scheduled',
    date: '10-04-2024',
  },
];
export const dataTwoButAllInactive = [
  {
    id: 1,
    day: 'friday',
    active: false,
    status: 'picked_up',
    date: '09-27-2024',
  },
  {
    id: 2,
    day: 'friday',
    active: false,
    status: 'scheduled',
    date: '10-04-2024',
  },
];
