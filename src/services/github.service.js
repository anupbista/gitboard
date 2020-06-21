import API from './api';
import { BASE_URL, TOKEN } from '../environments/dev.env';

export default {

    getGitHubUser: async (username) => {
        const query = `
            query SEARCH_USER($username: String!){
            user(login: $username) {
                id
                bio
                name
                company
                login
                avatarUrl
                }
            }
        `;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': TOKEN ? `Bearer ${TOKEN}` : ''
            }
        };
        const data = {
            query: query,
            variables: {
                username: username
            }
        }
        return API.post(BASE_URL, data, options);
    },

    getGitHubUserDetails: async (username) => {
        const query = `
            query SEARCH_USER($username: String!){
            user(login: $username) {
                id
                bio
                name
                company
                login
                avatarUrl
                status {
                    message
                }
                followers {
                    totalCount
                }
                following {
                    totalCount
                }
                repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
                totalCount
                nodes {
                    updatedAt
                    createdAt
                    description
                    isFork
                    isPrivate
                    name
                    sshUrl
                    url
                    id
                    languages(first: 100) {
                    nodes {
                        name
                        id
                        color
                    }
                    }
                }
                }
            }
            }
        `;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': TOKEN ? `Bearer ${TOKEN}` : ''
            }
        };
        const data = {
            query: query,
            variables: {
                username: username
            }
        }
        return API.post(BASE_URL, data, options);
    }
}