import axios from 'axios';

export interface Point {
    id: string;
    name: string;
    lat: string;
    lng: string;
}

class PointService {
    async getPoints(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<Point[]> {
        const API_URL_GET_POINTS = route('api.points.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<Point[]>(API_URL_GET_POINTS, params);
        return response.data;
    }

    async removePoint(id: number): Promise<any> {
        const API_URL_REMOVE_POINT = route('api.points.destroy', {id : id});

        return await axios.delete<Point[]>(API_URL_REMOVE_POINT);
    }
}

export default new PointService();
