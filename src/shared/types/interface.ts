import { registerEnumType } from "type-graphql";

export interface deleteResponse<T> {
    success: boolean
    id: T
}

export enum USER_ROLE {
    ADMIN="ADMIN",
    CLIENT="CLIENT",
    STAFF="STAFF"
}

registerEnumType(USER_ROLE, {
    name: "USER_ROLE", // this one is mandatory
    description: "Type of user", // this one is optional
  });