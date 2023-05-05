import axios from 'axios';

export interface Trip {
    name: string;
    totalPoints: string;
}

class TripService {
    async getTrips(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<Trip[]> {
        const API_URL_GET_PATHS = route('api.mountainsSection.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<Trip[]>(API_URL_GET_PATHS, params);
        return response.data;
    }

    async removeTrip(id: number): Promise<any> {
        const API_URL_REMOVE_PATHS = route('api.mountainsSection.destroy', {id : id});

        return await axios.delete<Trip[]>(API_URL_REMOVE_PATHS);
    }
}

export default new TripService();
