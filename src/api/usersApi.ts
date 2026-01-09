import type { AxiosResponse } from "axios";
import axios from "axios";
import type { User } from "../types/usersTypes";

// Fetch users from JSONPlaceholder
export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};
