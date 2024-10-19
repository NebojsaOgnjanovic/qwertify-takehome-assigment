import { UserResponseDto } from "../services/users/getAll";
import { PaginatedResponseDto } from "../types/paginated-response";
import { User } from "../types/user";

export const mapUsersResponseToClient = (
  response: PaginatedResponseDto<UserResponseDto>
) => {
  return {
    page: response.page,
    perPage: response.per_page,
    total: response.total,
    totalPages: response.total_pages,
    data: response.data.map((user) => mapUserDtoToClinet(user)),
  };
};

export const mapUserDtoToClinet = (data: UserResponseDto) => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    avatar: data.avatar,
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
