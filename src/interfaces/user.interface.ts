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

export interface CreatedUser {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
