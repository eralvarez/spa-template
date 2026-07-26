import { useQuery_experimental } from 'convex/react';
import type { FunctionReference } from 'convex/server';

type QueryState<T> =
  | {
      status: 'loading';
      data: undefined;
    }
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      data: undefined;
      error: Error;
    };

export function useQueryState<Query extends FunctionReference<'query'>>(
  query: Query,
  args?: Query['_args'],
): QueryState<Query['_returnType']> {
  const result = useQuery_experimental({ query, args });

  if (result.status === 'pending') {
    return {
      status: 'loading',
      data: undefined,
    };
  }

  if (result.status === 'error') {
    return {
      status: 'error',
      data: undefined,
      error: result.error,
    };
  }

  return {
    status: 'success',
    data: result.data,
  };
}
