import { DateTime } from 'luxon';
import {
  dataEmpty,
  dataOne,
  dataTwo,
  dataTwoButAllInactive,
  dataTwoButOneInactive,
} from './mock';

/**
 *
 * @var dayPreference: the day name that we're going to create
 * @var baseDate: the date which we're going to use as an initial date to create the next one. In case we don't pass this variable it's going to be today
 * @var interval: the interval of how many weeks of difference it's going to take. For example if you don't pass this variable it's going to be zero and the next event it should be the next available week. The explanation of this is:
 *  - when we don't provide the interval (by default zero) it's going to be used for the creation of the next available date.
 *     F.E. Today is 09-20-2024 -> Friday
 *     |-> if the next day that I want it's Saturday. the function it's going to return 09-21-2024. This is for the current week
 *     |-> if the next day that I want it's Wednesday. the function it's going to return 09-25-2024. This is for the next week
 *     What happens if the interval it's going to be more than 1? We have to provide the initial date to create the next date exactly on the next available week
 *     |->
 *
 */
const getNextAvailableDatesByDayPreference = (
  dayPreference:
    | 'one_day'
    | 'two_day'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday',
  baseDate: DateTime = DateTime.local(),
  interval: number = 0
): Date => {
  // this object is related to the luxon day of the week
  const daysOfWeek: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const today = baseDate; // Today's date
  const desiredDayOfWeek = daysOfWeek[dayPreference]; // Convert day name to equivalent number

  if (desiredDayOfWeek === -1 || desiredDayOfWeek === undefined) {
    throw new Error('Invalid day name provided.');
  }

  const daysToAdd = desiredDayOfWeek - today.weekday; // Calculate how many days until the desired day of the week

  // if it's this week we just have to add days. F.E.: Monday (1) to Friday (5) = 4
  // if it's next week we have to add 7 days because the number it's going to be negative. F.E.: Friday (5) to Monday (1) = -4
  const initialDaysToAdd = daysToAdd <= 0 ? daysToAdd + 7 : daysToAdd;

  if (interval == 0) {
    // this is an exceptional case because this is for the proximal event
    return today.plus({ days: initialDaysToAdd }).toJSDate();
  }

  // with the interval we're going to decide how much weeks ahead we want to create the date
  return today.plus({ days: initialDaysToAdd + (interval - 1) * 7 }).toJSDate();
};

const TODAY = new Date('09-20-2024');

// create an array of the neccesary dates one, two o nothing
const datesCreator = (data: any[], config) => {
  const a = data.filter((i) => i.active && i.status == 'scheduled');
  // console.log('a', a);
  if (a.length >= 2) {
    // stop execution
    return [];
  }

  if (a.length == 1) {
    const firstDate = a[0].date;
    const nextDate = getNextAvailableDatesByDayPreference(
      config.day,
      DateTime.fromJSDate(new Date(firstDate)),
      config.interval
    );
    // console.log('next', next);
    return [nextDate];
  }

  // if the length it's 0 we want to create 2 dates
  const firstDate = getNextAvailableDatesByDayPreference(config.day);
  const nextDate = getNextAvailableDatesByDayPreference(
    config.day,
    DateTime.fromJSDate(new Date(firstDate)),
    config.interval
  );
  return [firstDate, nextDate];
};

const config = {
  interval: 1,
  day: 'friday',
};

console.log('with empty data => ', datesCreator(dataEmpty, config));
console.log('with dataOne => ', datesCreator(dataOne, config));
console.log('with dataTwo => ', datesCreator(dataTwo, config));
console.log(
  'with dataTwoButOneInactive => ',
  datesCreator(dataTwoButOneInactive, config)
);
console.log(
  'with dataTwoButOneInactive => ',
  datesCreator(dataTwoButAllInactive, config)
);
console.log(
  'with no data we should create the first next week and the next interval', 
  datesCreator(dataTwoButAllInactive, {...config, interval: 3})

)