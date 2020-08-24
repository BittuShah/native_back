const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Category {
        category_id: ID!
        name: String!
        icon: String!
    }

    type User {
        user_id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Listing {
        product_id: ID!
        title: String!
        price: Float!
        description: String!
        category: String!
        user: User!
    }

    type GetListing {
        listing: Listing!
        image: String!
    }

    type Token {
        token: String!
        error: String!
    }

    input CategoryData {
        name: String!
        icon: String!
    }

    input ListingData {
        title: String!
        price: Float!
        description: String!
        user_id: ID!
        category_id: ID!
    }

    input UserData {
        name: String!
        email: String!
        password: String!
    }

    input LoginData {
        email: String!
        password: String!
    }

    input NoData {
        one: String!
    }

    type TestData {
        text: String!
        views: Int!
    }    

    type JustTest {
        yes: String!
    }

    type RootQuery {
        hello: TestData
        categories: [Category!]!
        listings: [GetListing!]!
    }    

    type RootMutation {
        createCategory(categoryInput: CategoryData): Category!
        createUser(userInput: UserData): User!
        createListing(listingInput: ListingData): Listing!
        loginUser(loginInput: LoginData): Token!
        tempMutation(noData: NoData): JustTest!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
