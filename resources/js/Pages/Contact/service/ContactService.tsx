import axios from 'axios';

interface Contact {
    id: number;
    name: string;
    title: string;
    email: string;
    phone_number: string;
    description: string;
    response: boolean;
}

class ContactService {
    async getContacts(paginate: number = 15, page: number = 1, sort: string = 'id', sortOrder: number = 0 ): Promise<Contact[]> {
        const API_URL_GET_CONTACTS = route('api.contacts.index');

        const params = { params: { paginate, page, sort, sortOrder } };
        const response = await axios.get<Contact[]>(API_URL_GET_CONTACTS, params);
        return response.data;
    }

    async removeContact(id: number): Promise<any> {
        const API_URL_REMOVE_CONTACT = route('api.contacts.destroy', {id : id});

        return await axios.delete<Contact[]>(API_URL_REMOVE_CONTACT);
    }

    async setResponse(id: number): Promise<any> {
        const API_URL_RESPONSE_CONTACT = route('api.contacts.response', {id : id});

        return await axios.delete<Contact[]>(API_URL_RESPONSE_CONTACT);
    }
}

export default new ContactService();
