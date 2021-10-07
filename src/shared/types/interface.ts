import { registerEnumType } from 'type-graphql';

export interface deleteResponse<T> {
  success: boolean;
  id: T;
}

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  STAFF = 'STAFF',
}

registerEnumType(USER_ROLE, {
  name: 'USER_ROLE', // this one is mandatory
  description: 'Type of user', // this one is optional
});

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

registerEnumType(USER_ROLE, {
  name: 'ORDER_STATUS', // this one is mandatory
  description: 'Status of order - pending or closed', // this one is optional
});
