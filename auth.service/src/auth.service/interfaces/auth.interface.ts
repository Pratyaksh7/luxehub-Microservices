import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}