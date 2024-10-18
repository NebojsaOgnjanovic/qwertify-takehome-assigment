import { UserResponseDto } from "../services/users/getAll";
import { PaginatedResposneDto } from "../types/paginated-response";
import { User } from "../types/user";

export const mapUsersResponseToClient = (
  response: PaginatedResposneDto<UserResponseDto>
) => {
  return {
    page: response.page,
    perPage: response.per_page,
    total: response.total,
    totalPages: response.total_pages,
    data: response.data.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar,
    })),
  };
};

export const mapClientUserToDto = (userData: {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}) => {
  return {
    email: userData.email,
    first_name: userData.firstName,
    last_name: userData.lastName,
    avatar: userData.avatar,
  };
};
