import axios from 'axios';

export interface Trip {
    name: string;
    date: string;
}

class TripService {
    async getTrips(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<Trip[]> {
        const API_URL_GET_TRIPS = route('api.trip.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<Trip[]>(API_URL_GET_TRIPS, params);
        return response.data;
    }
    async getMountainSectionByTrip(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0, mountainsSectionId: string = 'id'): Promise<Trip[]> {
        const API_URL_GET_TRIPS = route('api.trip.index');

        const params = { params: { paginate, page, sort, sortOrder, mountainsSectionId } };
        const response = await axios.get<Trip[]>(API_URL_GET_TRIPS, params);
        return response.data;
    }

    async removeTrip(id: number): Promise<any> {
        const API_URL_REMOVE_TRIPS = route('api.trip.destroy', {id : id});

        return await axios.delete<Trip[]>(API_URL_REMOVE_TRIPS);
    }
}

export default new TripService();
