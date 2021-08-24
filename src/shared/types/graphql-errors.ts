import { ApolloError } from 'apollo-server-express';

export class DuplicateRecordError extends ApolloError {
  constructor(message: string) {
    super(message, 'DUPLICATE_RECORD');

    Object.defineProperty(this, 'name', { value: 'DuplicateRecordError' });
  }
}
