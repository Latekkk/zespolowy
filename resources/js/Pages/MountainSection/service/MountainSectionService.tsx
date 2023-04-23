import axios from 'axios';

export interface MountainsSections {
    name: string;
    entry_points: string;
    points_for_descent: string;
}

class MountainSectionService {
    async getMountainsSections(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<MountainsSections[]> {
        const API_URL_GET_PATHS = route('api.mountainsSection.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<MountainsSections[]>(API_URL_GET_PATHS, params);
        return response.data;
    }

    async removeMountainsSection(id: number): Promise<any> {
        const API_URL_REMOVE_PATHS = route('api.mountainsSection.destroy', {id : id});

        return await axios.delete<MountainsSections[]>(API_URL_REMOVE_PATHS);
    }
}

export default new MountainSectionService();
