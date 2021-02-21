/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShip = /* GraphQL */ `
  mutation CreateShip(
    $input: CreateShipInput!
    $condition: ModelShipConditionInput
  ) {
    createShip(input: $input, condition: $condition) {
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
export const updateShip = /* GraphQL */ `
  mutation UpdateShip(
    $input: UpdateShipInput!
    $condition: ModelShipConditionInput
  ) {
    updateShip(input: $input, condition: $condition) {
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
export const deleteShip = /* GraphQL */ `
  mutation DeleteShip(
    $input: DeleteShipInput!
    $condition: ModelShipConditionInput
  ) {
    deleteShip(input: $input, condition: $condition) {
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
export const createWeatherEvent = /* GraphQL */ `
  mutation CreateWeatherEvent(
    $input: CreateWeatherEventInput!
    $condition: ModelWeatherEventConditionInput
  ) {
    createWeatherEvent(input: $input, condition: $condition) {
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
export const updateWeatherEvent = /* GraphQL */ `
  mutation UpdateWeatherEvent(
    $input: UpdateWeatherEventInput!
    $condition: ModelWeatherEventConditionInput
  ) {
    updateWeatherEvent(input: $input, condition: $condition) {
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
export const deleteWeatherEvent = /* GraphQL */ `
  mutation DeleteWeatherEvent(
    $input: DeleteWeatherEventInput!
    $condition: ModelWeatherEventConditionInput
  ) {
    deleteWeatherEvent(input: $input, condition: $condition) {
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
