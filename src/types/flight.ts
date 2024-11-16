export interface Airport {
  code: string;
  name: string;
}

export interface FlightBooking {
  fromLocation: Airport;
  toLocation: Airport;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  class: 'economy' | 'business' | 'first';
}

export interface PolicyRule {
  id: string;
  condition: (booking: FlightBooking) => boolean;
  message: string;
  severity: 'info' | 'warning' | 'error';
}