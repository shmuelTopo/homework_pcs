import { StringDecoder } from "string_decoder";

export interface Address {
    streetName: String;
    streetNumber: Number;
    city: String;
    state: String;
    country: String;
    zipCode: String;
}

export interface Person {
    firstName: String;
    lastName: String;
    age: Number;
    address: Address;
    email: String;
}
