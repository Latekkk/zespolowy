import axios from 'axios';
import { MountainSection } from '@/Models/MountainSection';
class MountainSectionService {
    async getMountainsSections(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<MountainsSections[]> {
        const API_URL_GET_PATHS = route('api.mountainsSection.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<MountainSection[]>(API_URL_GET_PATHS, params);
        return response.data;
    }

    async removeMountainsSection(id: number): Promise<any> {
        const API_URL_REMOVE_PATHS = route('api.mountainsSection.destroy', {id : id});

        return await axios.delete<MountainSection[]>(API_URL_REMOVE_PATHS);
    }
}

export default new MountainSectionService();
