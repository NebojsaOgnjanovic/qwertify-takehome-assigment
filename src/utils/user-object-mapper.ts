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

export const mapClientUserToDto = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    avatar: user.avatar,
  };
};
