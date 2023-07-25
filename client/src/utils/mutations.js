import { gql } from '@apollo/client';

export const LOGIN_USERS = gql
`mutation login(email: String!, password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            }
        }
    }
}`;

export const ADD_USERS = gql`
mutation addUser(username: String!, email: String!, password: String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
    }

}`;

export const SAVE_BOOKS = gql`
mutation saveBook (newBook: BookInput!) {
    saveBook(newBook: $newBook) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`;

export const REMOVE_BOOKS = gql`
mutation removeBook (bookId: ID!)) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`;
