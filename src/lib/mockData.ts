import { faker } from '@faker-js/faker';

export const generateStadiums = (count = 10) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name() + ' Stadium',
    city: faker.location.city(),
    capacity: faker.number.int({ min: 20000, max: 90000 }),
    currentAttendance: faker.number.int({ min: 5000, max: 90000 }),
    parkingCapacity: faker.number.int({ min: 2000, max: 10000 }),
    foodCourts: faker.number.int({ min: 5, max: 20 }),
    gates: faker.number.int({ min: 4, max: 12 }),
    securityStaff: faker.number.int({ min: 50, max: 300 }),
    medicalTeams: faker.number.int({ min: 2, max: 10 }),
    weather: faker.helpers.arrayElement(['Sunny', 'Cloudy', 'Rainy', 'Clear']),
    eventToday: faker.helpers.arrayElement([true, false])
  }));
};

export const generateTournaments = (count = 8) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName() + ' Cup',
    sport: faker.helpers.arrayElement(['Football', 'Cricket', 'Rugby', 'Athletics']),
    organizer: faker.company.name(),
    startDate: faker.date.future().toISOString(),
    endDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['Upcoming', 'Ongoing', 'Completed']),
    prizePool: faker.finance.amount({ min: 100000, max: 5000000, symbol: '$' }),
    teamsCount: faker.number.int({ min: 8, max: 32 }),
  }));
};

export const generateMatches = (count = 15) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    teamA: faker.location.city() + ' ' + faker.animal.type(),
    teamB: faker.location.city() + ' ' + faker.animal.type(),
    venue: faker.company.name() + ' Stadium',
    time: faker.date.soon().toISOString(),
    status: faker.helpers.arrayElement(['Upcoming', 'Live', 'Completed']),
    scoreA: faker.number.int({ min: 0, max: 5 }),
    scoreB: faker.number.int({ min: 0, max: 5 }),
    attendance: faker.number.int({ min: 10000, max: 60000 })
  }));
};

export const generateIncidents = (count = 5) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: faker.helpers.arrayElement(['Crowd Control', 'Medical', 'Security', 'Fire Alert', 'Lost Child']),
    location: 'Gate ' + faker.number.int({ min: 1, max: 10 }) + ' / Sec ' + faker.number.int({ min: 100, max: 300 }),
    status: faker.helpers.arrayElement(['active', 'resolved']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical'])
  }));
};

export const generateNotifications = (count = 10) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement(['Match Started', 'Parking Full', 'Heavy Crowd', 'Medical Needed', 'VIP Arrival']),
    message: faker.lorem.sentence(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isRead: faker.datatype.boolean()
  }));
};
