/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShip = /* GraphQL */ `
  query GetShip($id: ID!) {
    getShip(id: $id) {
      id
      name
      description
      location {
        lat
        lng
      }
      createdAt
      updatedAt
    }
  }
`;
export const listShips = /* GraphQL */ `
  query ListShips(
    $filter: ModelShipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        location {
          lat
          lng
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWeatherEvent = /* GraphQL */ `
  query GetWeatherEvent($id: ID!) {
    getWeatherEvent(id: $id) {
      id
      name
      description
      isActive
      location {
        lat
        lng
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWeatherEvents = /* GraphQL */ `
  query ListWeatherEvents(
    $filter: ModelWeatherEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeatherEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        isActive
        location {
          lat
          lng
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
