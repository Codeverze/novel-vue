import axios, { AxiosRequestConfig } from 'axios';


export const customComplete = async (prompt: string, headers: AxiosRequestConfig, url: string = '/openai/completion') => { 

    try {
        const response = await axios.post(url, {
            prompt: prompt,
        }, headers);

        if (response.data.success) {
            return response.data.completion
        }

        throw new Error('Failed to complete prompt');
    } catch (error) {
        console.log(error);
    }
}


