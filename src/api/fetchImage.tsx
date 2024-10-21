import api from './axiosApi';

async function fetchImage(url: string): Promise<string> {
    try {
        const response = await api.get(url, {
            responseType: 'blob',
        });
        const imageBlob = response.data;
        return URL.createObjectURL(imageBlob);
    } catch (error) {

        console.error('Error fetching image:', error);
        throw error;
    }
}

export default fetchImage;
