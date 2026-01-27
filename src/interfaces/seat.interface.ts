export interface BookingSeat {
  row: number;
  number: number;
}

export interface Seat extends BookingSeat {
  isBooked: boolean;
}
