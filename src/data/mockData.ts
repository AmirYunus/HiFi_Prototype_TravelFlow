import { Airport, PolicyRule } from '../types/flight';

export const airports: Airport[] = [
  { code: 'JFK', name: 'New York JFK' },
  { code: 'LAX', name: 'Los Angeles International' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'DXB', name: 'Dubai International' },
];

export const policyRules: PolicyRule[] = [
  {
    id: '1',
    condition: (booking) =>
      booking.class === 'first' && 
      new Date(booking.dateRange.startDate).getDay() === 0,
    message: 'First class bookings are not allowed on Sundays',
    severity: 'error',
  },
  {
    id: '2',
    condition: (booking) =>
      booking.class === 'business' &&
      new Date(booking.dateRange.startDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000,
    message: 'Business class bookings should be made at least 7 days in advance',
    severity: 'warning',
  },
];