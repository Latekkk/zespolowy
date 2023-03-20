import axios from 'axios';

export interface Path {
    name: string;
    entry_points: string;
    points_for_descent: string;
    distance: string;
    first_point: string;
    second_point: string;
}

class PathService {
    async getPaths(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<Path[]> {
        const API_URL_GET_PATHS = route('api.paths.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<Path[]>(API_URL_GET_PATHS, params);
        return response.data;
    }

    async removePath(id: number): Promise<any> {
        const API_URL_REMOVE_PATHS = route('api.paths.destroy', {id : id});

        return await axios.delete<Path[]>(API_URL_REMOVE_PATHS);
    }
}

export default new PathService();
