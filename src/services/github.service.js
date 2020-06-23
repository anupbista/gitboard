import API from './api';

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
                'authorization': process.env.REACT_APP_TOKEN ? `Bearer ${process.env.REACT_APP_TOKEN}` : null
            }
        };
        const data = {
            query: query,
            variables: {
                username: username
            }
        }
        return API.post(process.env.REACT_APP_BASE_URL, data, options);
    },

    getGitHubUserByName: async (name, afterCursor = null) => {
        let query = `
            query SEARCH_USER ($name: String!){
                search(type: USER, query: $name, first: 10) {
                    edges {
                        cursor
                        node {
                          ... on User {
                            id
                            avatarUrl
                            login
                            name
                          }
                        }
                      }
                    userCount
                    pageInfo {
                        hasNextPage
                      }
                }
            }
        `;
        if(afterCursor){
            query = `
            query SEARCH_USER ($name: String!, $afterCursor: String!){
                search(type: USER, query: $name, first: 10, after: $afterCursor) {
                    edges {
                        cursor
                        node {
                          ... on User {
                            id
                            avatarUrl
                            login
                            name
                          }
                        }
                      }
                    userCount
                    pageInfo {
                        hasNextPage
                      }
                }
            }
        `;
        }
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.REACT_APP_TOKEN ? `Bearer ${process.env.REACT_APP_TOKEN}` : null
            }
        };
        const data = {
            query: query,
            variables: afterCursor ? {
                name: name,
                afterCursor: afterCursor
            } : 
            {
                name: name,
            }
        }
        return API.post(process.env.REACT_APP_BASE_URL, data, options);
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
                repositories(first: 8, orderBy: {field: UPDATED_AT, direction: DESC}) {
                totalCount
                edges {
                    node {
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
                    cursor
                  }
                  pageInfo {
                    hasNextPage
                  }
                }
            }
            }
        `;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.REACT_APP_TOKEN ? `Bearer ${process.env.REACT_APP_TOKEN}` : ''
            }
        };
        const data = {
            query: query,
            variables: {
                username: username
            }
        }
        return API.post(process.env.REACT_APP_BASE_URL, data, options);
    },

    getGitHubUserRepos: async (username, afterCursor) => {
        const query = `
            query GET_REPOS($username: String!, $afterCursor: String!){
                user(login: $username) {
                    repositories(first: 8, after: $afterCursor, orderBy: {field: UPDATED_AT, direction: DESC}) {
                        totalCount
                        edges {
                            node {
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
                            cursor
                          }
                          pageInfo {
                            hasNextPage
                          }
                    }
                  }
            }
        `;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.REACT_APP_TOKEN ? `Bearer ${process.env.REACT_APP_TOKEN}` : ''
            }
        };
        const data = {
            query: query,
            variables: {
                username: username,
                afterCursor: afterCursor
            }
        }
        return API.post(process.env.REACT_APP_BASE_URL, data, options);
    }
}