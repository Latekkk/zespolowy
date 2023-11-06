import axios from 'axios';
import {Badge} from "@/Models/Badge";

interface Contact {
    id: number;
    name: string;
    title: string;
    email: string;
    phone_number: string;
    description: string;
    response: boolean;
}

class BadgeService {
    async getBadges(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0, responseSwitch: boolean = false ): Promise<Badge[]> {
        const API_URL_GET_BADGES = route('api.badge.index');

        const params = { params: { paginate, page, sort, sortOrder, responseSwitch } };
        const response = await axios.get<Badge[]>(API_URL_GET_BADGES, params);
        return response.data;
    }

    async removeBadge(id: number): Promise<any> {
        const API_URL_REMOVE_BADGE = route('api.badge.destroy', {id : id});

        return await axios.delete<Badge[]>(API_URL_REMOVE_BADGE);
    }

    async setResponse(id: number): Promise<any> {
        const API_URL_RESPONSE_BADGE = route('api.badge.response', {id : id});

        return await axios.post<Badge[]>(API_URL_RESPONSE_BADGE);
    }
}

export default new BadgeService();
