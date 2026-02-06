export interface DetailedUser {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  totalMoviesBooked: number;
  totalSeatsBooked: number;
  totalMoneySpent: number;
}
