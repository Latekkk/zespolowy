import { User } from '@/Models/User';
import axios from 'axios';



class UserService {
    async getUsers(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 , userName: string| null = null): Promise<User[]> {
        const API_URL_GET_USERS = route('api.users.index');
        const params = { params: { paginate, page, sort, sortOrder, userName } };
        const response = await axios.get<User[]>(API_URL_GET_USERS, params);
        return response.data;
    }

    async removeUser(id: number): Promise<any> {
        const API_URL_REMOVE_USER = route('api.users.destroy', {id : id});
        return await axios.delete<User[]>(API_URL_REMOVE_USER);
    }
}

export default new UserService();
