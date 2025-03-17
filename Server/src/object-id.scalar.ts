import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { Types } from 'mongoose';

@Scalar('ObjectId')
export class ObjectIdScalar implements CustomScalar<string, Types.ObjectId> {
  description = 'MongoDB ObjectId custom scalar type';

  parseValue(value: string): Types.ObjectId {
    return new Types.ObjectId(value);
  }

  serialize(value: Types.ObjectId): string {
    return value.toHexString();
  }

  parseLiteral(ast: ValueNode): Types.ObjectId {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value);
    }
    throw new Error('Invalid ObjectId literal');
  }
}
