/**
 * Client
 **/

import * as runtime from './runtime';
declare const prisma: unique symbol;
export type PrismaPromise<A> = Promise<A> & { [prisma]: true };
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}`
    ? Tuple[K] extends PrismaPromise<infer X>
      ? X
      : UnwrapPromise<Tuple[K]>
    : UnwrapPromise<Tuple[K]>;
};

/**
 * Model User
 */

export type User = {
  id: number;
  createdAt: Date;
  email: string;
  name: string | null;
  password: string;
  groupId: number | null;
};

/**
 * Model Post
 */

export type Post = {
  id: number;
  published: boolean;
  title: string;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Comment
 */

export type Comment = {
  id: number;
  contain: string;
  postId: number;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Group
 */

export type Group = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model List
 */

export type List = {
  id: number;
  intger: number[];
  flout: number[];
  string: string[];
  enums: Rols[];
  boolean: boolean[];
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Rols: {
  USER: 'USER';
  ADMIN: 'ADMIN';
};

export type Rols = typeof Rols[keyof typeof Rols];

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T['log']>
      : never
    : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T ? T['rejectOnNotFound'] : false
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U | 'beforeExit'>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent,
    ) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Comments
   * const comments = await prisma.comment.findMany()
   * ```
   */
  get comment(): Prisma.CommentDelegate<GlobalReject>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Groups
   * const groups = await prisma.group.findMany()
   * ```
   */
  get group(): Prisma.GroupDelegate<GlobalReject>;

  /**
   * `prisma.list`: Exposes CRUD operations for the **List** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Lists
   * const lists = await prisma.list.findMany()
   * ```
   */
  get list(): Prisma.ListDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  /**
   * Prisma Client JS version: 2.20.1
   * Query Engine version: 60ba6551f29b17d7d6ce479e5733c70d9c00860e
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue };

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = { [Key in string]?: JsonValue };

  export interface InputJsonArray extends Array<JsonValue> {}

  export type InputJsonValue = undefined | string | number | boolean | null | InputJsonObject | InputJsonArray;
  type SelectAndInclude = {
    select: any;
    include: any;
  };
  type HasSelect = {
    select: any;
  };
  type HasInclude = {
    include: any;
  };
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S;

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key;
  }[keyof T];

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } &
    (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } &
    K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Buffer
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  export type Union = any;

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Exact<A, W = unknown> = W extends unknown
    ? A extends Narrowable
      ? Cast<A, W>
      : Cast<
          { [K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never },
          { [K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K] }
        >
    : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>> = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>;

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(
      document: any,
      dataPath?: string[],
      rootField?: string,
      typeName?: string,
      isList?: boolean,
      callsite?: string,
    ): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User';
    Post: 'Post';
    Comment: 'Comment';
    Group: 'Group';
    List: 'List';
  };

  export type ModelName = typeof ModelName[keyof typeof ModelName];

  export type Datasources = {
    postgresql?: Datasource;
  };

  export type RejectOnNotFound = boolean | ((error: Error) => Error);
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
  export type RejectPerOperation = { [P in 'findUnique' | 'findFirst']?: RejectPerModel | RejectOnNotFound };
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False;
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null.
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
  }

  export type Hooks = {
    beforeRequest?: (options: {
      query: string;
      path: string[];
      rootField?: string;
      typeName?: string;
      document: any;
    }) => any;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count';

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;
  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    count: UserCountAggregateOutputType | null;
    avg: UserAvgAggregateOutputType | null;
    sum: UserSumAggregateOutputType | null;
    min: UserMinAggregateOutputType | null;
    max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    id: number;
    groupId: number | null;
  };

  export type UserSumAggregateOutputType = {
    id: number;
    groupId: number | null;
  };

  export type UserMinAggregateOutputType = {
    id: number;
    createdAt: Date | null;
    email: string | null;
    name: string | null;
    password: string | null;
    groupId: number | null;
  };

  export type UserMaxAggregateOutputType = {
    id: number;
    createdAt: Date | null;
    email: string | null;
    name: string | null;
    password: string | null;
    groupId: number | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    createdAt: number | null;
    email: number | null;
    name: number | null;
    password: number | null;
    groupId: number | null;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    id?: true;
    groupId?: true;
  };

  export type UserSumAggregateInputType = {
    id?: true;
    groupId?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
    groupId?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
    groupId?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
    groupId?: true;
    _all?: true;
  };

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs = {
    where?: UserWhereInput;
    orderBy?: Enumerable<UserOrderByInput>;
    by: Array<UserScalarFieldEnum>;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: UserCountAggregateInputType | true;
    avg?: UserAvgAggregateInputType;
    sum?: UserSumAggregateInputType;
    min?: UserMinAggregateInputType;
    max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: number;
    createdAt: Date;
    email: string;
    name: string | null;
    password: string;
    groupId: number | null;
    count: UserCountAggregateOutputType | null;
    avg: UserAvgAggregateOutputType | null;
    sum: UserSumAggregateOutputType | null;
    min: UserMinAggregateOutputType | null;
    max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof UserGroupByOutputType]: GetScalarType<T[P], UserGroupByOutputType[P]>;
        }
    >
  >;

  export type UserSelect = {
    id?: boolean;
    createdAt?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
    posts?: boolean | PostFindManyArgs;
    group?: boolean | GroupArgs;
    groupId?: boolean;
    comments?: boolean | CommentFindManyArgs;
  };

  export type UserInclude = {
    posts?: boolean | PostFindManyArgs;
    group?: boolean | GroupArgs;
    comments?: boolean | CommentFindManyArgs;
  };

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs, U = keyof S> = S extends true
    ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ? 'include' extends U
      ? User &
          {
            [P in TrueKeys<S['include']>]: P extends 'posts'
              ? Array<PostGetPayload<S['include'][P]>>
              : P extends 'group'
              ? GroupGetPayload<S['include'][P]> | null
              : P extends 'comments'
              ? Array<CommentGetPayload<S['include'][P]>>
              : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof User
            ? User[P]
            : P extends 'posts'
            ? Array<PostGetPayload<S['select'][P]>>
            : P extends 'group'
            ? GroupGetPayload<S['select'][P]> | null
            : P extends 'comments'
            ? Array<CommentGetPayload<S['select'][P]>>
            : never;
        }
      : User
    : User;

  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true;
    }
  >;

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends UserFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, UserFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True
      ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
      : CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends UserFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, UserFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True
      ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
      : CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>,
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>;

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>,
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>,
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>,
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends PostFindManyArgs = {}>(
      args?: Subset<T, PostFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>;

    group<T extends GroupArgs = {}>(
      args?: Subset<T, GroupArgs>,
    ): CheckSelect<T, Prisma__GroupClient<Group | null>, Prisma__GroupClient<GroupGetPayload<T> | null>>;

    comments<T extends CommentFindManyArgs = {}>(
      args?: Subset<T, CommentFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     **/
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Filter, which Users to fetch.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The data needed to create a User.
     **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The data needed to update a User.
     **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The filter to search for the User to update in case it exists.
     **/
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Filter which User to delete.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput;
  };

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
  };

  /**
   * Model Post
   */

  export type AggregatePost = {
    count: PostCountAggregateOutputType | null;
    avg: PostAvgAggregateOutputType | null;
    sum: PostSumAggregateOutputType | null;
    min: PostMinAggregateOutputType | null;
    max: PostMaxAggregateOutputType | null;
  };

  export type PostAvgAggregateOutputType = {
    id: number;
    authorId: number | null;
  };

  export type PostSumAggregateOutputType = {
    id: number;
    authorId: number | null;
  };

  export type PostMinAggregateOutputType = {
    id: number;
    published: boolean | null;
    title: string | null;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PostMaxAggregateOutputType = {
    id: number;
    published: boolean | null;
    title: string | null;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PostCountAggregateOutputType = {
    id: number;
    published: number | null;
    title: number | null;
    authorId: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    _all: number;
  };

  export type PostAvgAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type PostSumAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type PostMinAggregateInputType = {
    id?: true;
    published?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PostMaxAggregateInputType = {
    id?: true;
    published?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PostCountAggregateInputType = {
    id?: true;
    published?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
     **/
    where?: PostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Posts to fetch.
     **/
    orderBy?: Enumerable<PostOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: PostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Posts from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Posts.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Posts
     **/
    count?: true | PostCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: PostAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: PostSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: PostMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: PostMaxAggregateInputType;
  };

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>;
  };

  export type PostGroupByArgs = {
    where?: PostWhereInput;
    orderBy?: Enumerable<PostOrderByInput>;
    by: Array<PostScalarFieldEnum>;
    having?: PostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: PostCountAggregateInputType | true;
    avg?: PostAvgAggregateInputType;
    sum?: PostSumAggregateInputType;
    min?: PostMinAggregateInputType;
    max?: PostMaxAggregateInputType;
  };

  export type PostGroupByOutputType = {
    id: number;
    published: boolean;
    title: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date;
    count: PostCountAggregateOutputType | null;
    avg: PostAvgAggregateOutputType | null;
    sum: PostSumAggregateOutputType | null;
    min: PostMinAggregateOutputType | null;
    max: PostMaxAggregateOutputType | null;
  };

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Promise<
    Array<
      PickArray<PostGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof PostGroupByOutputType]: GetScalarType<T[P], PostGroupByOutputType[P]>;
        }
    >
  >;

  export type PostSelect = {
    id?: boolean;
    published?: boolean;
    title?: boolean;
    author?: boolean | UserArgs;
    authorId?: boolean;
    comments?: boolean | CommentFindManyArgs;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PostInclude = {
    author?: boolean | UserArgs;
    comments?: boolean | CommentFindManyArgs;
  };

  export type PostGetPayload<S extends boolean | null | undefined | PostArgs, U = keyof S> = S extends true
    ? Post
    : S extends undefined
    ? never
    : S extends PostArgs | PostFindManyArgs
    ? 'include' extends U
      ? Post &
          {
            [P in TrueKeys<S['include']>]: P extends 'author'
              ? UserGetPayload<S['include'][P]> | null
              : P extends 'comments'
              ? Array<CommentGetPayload<S['include'][P]>>
              : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Post
            ? Post[P]
            : P extends 'author'
            ? UserGetPayload<S['select'][P]> | null
            : P extends 'comments'
            ? Array<CommentGetPayload<S['select'][P]>>
            : never;
        }
      : Post
    : Post;

  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true;
    }
  >;

  export interface PostDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends PostFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, PostFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True
      ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
      : CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends PostFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, PostFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True
      ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
      : CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     *
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>;

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     *
     **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>,
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>;

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     *
     **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>,
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>;

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>,
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>;

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>,
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>;

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
     **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): PrismaPromise<GetPostAggregateType<T>>;

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPostGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs = {}>(
      args?: Subset<T, UserArgs>,
    ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    comments<T extends CommentFindManyArgs = {}>(
      args?: Subset<T, CommentFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * Throw an Error if a Post can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Post to fetch.
     **/
    where: PostWhereUniqueInput;
  };

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * Throw an Error if a Post can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Post to fetch.
     **/
    where?: PostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Posts to fetch.
     **/
    orderBy?: Enumerable<PostOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Posts.
     **/
    cursor?: PostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Posts from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Posts.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Posts.
     **/
    distinct?: Enumerable<PostScalarFieldEnum>;
  };

  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * Filter, which Posts to fetch.
     **/
    where?: PostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Posts to fetch.
     **/
    orderBy?: Enumerable<PostOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Posts.
     **/
    cursor?: PostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Posts from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Posts.
     **/
    skip?: number;
    distinct?: Enumerable<PostScalarFieldEnum>;
  };

  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * The data needed to create a Post.
     **/
    data: XOR<PostCreateInput, PostUncheckedCreateInput>;
  };

  /**
   * Post createMany
   */
  export type PostCreateManyArgs = {
    data: Enumerable<PostCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * The data needed to update a Post.
     **/
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>;
    /**
     * Choose, which Post to update.
     **/
    where: PostWhereUniqueInput;
  };

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>;
    where?: PostWhereInput;
  };

  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * The filter to search for the Post to update in case it exists.
     **/
    where: PostWhereUniqueInput;
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     **/
    create: XOR<PostCreateInput, PostUncheckedCreateInput>;
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>;
  };

  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
    /**
     * Filter which Post to delete.
     **/
    where: PostWhereUniqueInput;
  };

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    where?: PostWhereInput;
  };

  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
     **/
    select?: PostSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: PostInclude | null;
  };

  /**
   * Model Comment
   */

  export type AggregateComment = {
    count: CommentCountAggregateOutputType | null;
    avg: CommentAvgAggregateOutputType | null;
    sum: CommentSumAggregateOutputType | null;
    min: CommentMinAggregateOutputType | null;
    max: CommentMaxAggregateOutputType | null;
  };

  export type CommentAvgAggregateOutputType = {
    id: number;
    postId: number;
    authorId: number | null;
  };

  export type CommentSumAggregateOutputType = {
    id: number;
    postId: number;
    authorId: number | null;
  };

  export type CommentMinAggregateOutputType = {
    id: number;
    contain: string | null;
    postId: number;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CommentMaxAggregateOutputType = {
    id: number;
    contain: string | null;
    postId: number;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CommentCountAggregateOutputType = {
    id: number;
    contain: number | null;
    postId: number;
    authorId: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    _all: number;
  };

  export type CommentAvgAggregateInputType = {
    id?: true;
    postId?: true;
    authorId?: true;
  };

  export type CommentSumAggregateInputType = {
    id?: true;
    postId?: true;
    authorId?: true;
  };

  export type CommentMinAggregateInputType = {
    id?: true;
    contain?: true;
    postId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CommentMaxAggregateInputType = {
    id?: true;
    contain?: true;
    postId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CommentCountAggregateInputType = {
    id?: true;
    contain?: true;
    postId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type CommentAggregateArgs = {
    /**
     * Filter which Comment to aggregate.
     **/
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     **/
    orderBy?: Enumerable<CommentOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Comments
     **/
    count?: true | CommentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: CommentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: CommentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: CommentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: CommentMaxAggregateInputType;
  };

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
    [P in keyof T & keyof AggregateComment]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>;
  };

  export type CommentGroupByArgs = {
    where?: CommentWhereInput;
    orderBy?: Enumerable<CommentOrderByInput>;
    by: Array<CommentScalarFieldEnum>;
    having?: CommentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: CommentCountAggregateInputType | true;
    avg?: CommentAvgAggregateInputType;
    sum?: CommentSumAggregateInputType;
    min?: CommentMinAggregateInputType;
    max?: CommentMaxAggregateInputType;
  };

  export type CommentGroupByOutputType = {
    id: number;
    contain: string;
    postId: number;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date;
    count: CommentCountAggregateOutputType | null;
    avg: CommentAvgAggregateOutputType | null;
    sum: CommentSumAggregateOutputType | null;
    min: CommentMinAggregateOutputType | null;
    max: CommentMaxAggregateOutputType | null;
  };

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Promise<
    Array<
      PickArray<CommentGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof CommentGroupByOutputType]: GetScalarType<T[P], CommentGroupByOutputType[P]>;
        }
    >
  >;

  export type CommentSelect = {
    id?: boolean;
    contain?: boolean;
    post?: boolean | PostArgs;
    postId?: boolean;
    author?: boolean | UserArgs;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type CommentInclude = {
    post?: boolean | PostArgs;
    author?: boolean | UserArgs;
  };

  export type CommentGetPayload<S extends boolean | null | undefined | CommentArgs, U = keyof S> = S extends true
    ? Comment
    : S extends undefined
    ? never
    : S extends CommentArgs | CommentFindManyArgs
    ? 'include' extends U
      ? Comment &
          {
            [P in TrueKeys<S['include']>]: P extends 'post'
              ? PostGetPayload<S['include'][P]>
              : P extends 'author'
              ? UserGetPayload<S['include'][P]> | null
              : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Comment
            ? Comment[P]
            : P extends 'post'
            ? PostGetPayload<S['select'][P]>
            : P extends 'author'
            ? UserGetPayload<S['select'][P]> | null
            : never;
        }
      : Comment
    : Comment;

  type CommentCountArgs = Merge<
    Omit<CommentFindManyArgs, 'select' | 'include'> & {
      select?: CommentCountAggregateInputType | true;
    }
  >;

  export interface CommentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends CommentFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, CommentFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Comment'> extends True
      ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
      : CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>;

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends CommentFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, CommentFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Comment'> extends True
      ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
      : CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>;

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     *
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends CommentFindManyArgs>(
      args?: SelectSubset<T, CommentFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     *
     **/
    create<T extends CommentCreateArgs>(
      args: SelectSubset<T, CommentCreateArgs>,
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>;

    /**
     * Create many Comments.
     *     @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     *     @example
     *     // Create many Comments
     *     const comment = await prisma.comment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends CommentCreateManyArgs>(
      args?: SelectSubset<T, CommentCreateManyArgs>,
    ): PrismaPromise<BatchPayload>;

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     *
     **/
    delete<T extends CommentDeleteArgs>(
      args: SelectSubset<T, CommentDeleteArgs>,
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>;

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends CommentUpdateArgs>(
      args: SelectSubset<T, CommentUpdateArgs>,
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>;

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends CommentDeleteManyArgs>(
      args?: SelectSubset<T, CommentDeleteManyArgs>,
    ): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends CommentUpdateManyArgs>(
      args: SelectSubset<T, CommentUpdateManyArgs>,
    ): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     **/
    upsert<T extends CommentUpsertArgs>(
      args: SelectSubset<T, CommentUpsertArgs>,
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>;

    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
     **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CommentAggregateArgs>(
      args: Subset<T, CommentAggregateArgs>,
    ): PrismaPromise<GetCommentAggregateType<T>>;

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetCommentGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CommentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    post<T extends PostArgs = {}>(
      args?: Subset<T, PostArgs>,
    ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

    author<T extends UserArgs = {}>(
      args?: Subset<T, UserArgs>,
    ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * Throw an Error if a Comment can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Comment to fetch.
     **/
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * Throw an Error if a Comment can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Comment to fetch.
     **/
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     **/
    orderBy?: Enumerable<CommentOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Comments.
     **/
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Comments.
     **/
    distinct?: Enumerable<CommentScalarFieldEnum>;
  };

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * Filter, which Comments to fetch.
     **/
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     **/
    orderBy?: Enumerable<CommentOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Comments.
     **/
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     **/
    skip?: number;
    distinct?: Enumerable<CommentScalarFieldEnum>;
  };

  /**
   * Comment create
   */
  export type CommentCreateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * The data needed to create a Comment.
     **/
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>;
  };

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs = {
    data: Enumerable<CommentCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * Comment update
   */
  export type CommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * The data needed to update a Comment.
     **/
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>;
    /**
     * Choose, which Comment to update.
     **/
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs = {
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>;
    where?: CommentWhereInput;
  };

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * The filter to search for the Comment to update in case it exists.
     **/
    where: CommentWhereUniqueInput;
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     **/
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>;
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>;
  };

  /**
   * Comment delete
   */
  export type CommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
    /**
     * Filter which Comment to delete.
     **/
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs = {
    where?: CommentWhereInput;
  };

  /**
   * Comment without action
   */
  export type CommentArgs = {
    /**
     * Select specific fields to fetch from the Comment
     **/
    select?: CommentSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: CommentInclude | null;
  };

  /**
   * Model Group
   */

  export type AggregateGroup = {
    count: GroupCountAggregateOutputType | null;
    avg: GroupAvgAggregateOutputType | null;
    sum: GroupSumAggregateOutputType | null;
    min: GroupMinAggregateOutputType | null;
    max: GroupMaxAggregateOutputType | null;
  };

  export type GroupAvgAggregateOutputType = {
    id: number;
  };

  export type GroupSumAggregateOutputType = {
    id: number;
  };

  export type GroupMinAggregateOutputType = {
    id: number;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type GroupMaxAggregateOutputType = {
    id: number;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type GroupCountAggregateOutputType = {
    id: number;
    name: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    _all: number;
  };

  export type GroupAvgAggregateInputType = {
    id?: true;
  };

  export type GroupSumAggregateInputType = {
    id?: true;
  };

  export type GroupMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type GroupMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type GroupCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type GroupAggregateArgs = {
    /**
     * Filter which Group to aggregate.
     **/
    where?: GroupWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Groups to fetch.
     **/
    orderBy?: Enumerable<GroupOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: GroupWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Groups from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Groups.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Groups
     **/
    count?: true | GroupCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: GroupAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: GroupSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: GroupMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: GroupMaxAggregateInputType;
  };

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
    [P in keyof T & keyof AggregateGroup]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>;
  };

  export type GroupGroupByArgs = {
    where?: GroupWhereInput;
    orderBy?: Enumerable<GroupOrderByInput>;
    by: Array<GroupScalarFieldEnum>;
    having?: GroupScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: GroupCountAggregateInputType | true;
    avg?: GroupAvgAggregateInputType;
    sum?: GroupSumAggregateInputType;
    min?: GroupMinAggregateInputType;
    max?: GroupMaxAggregateInputType;
  };

  export type GroupGroupByOutputType = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    count: GroupCountAggregateOutputType | null;
    avg: GroupAvgAggregateOutputType | null;
    sum: GroupSumAggregateOutputType | null;
    min: GroupMinAggregateOutputType | null;
    max: GroupMaxAggregateOutputType | null;
  };

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Promise<
    Array<
      PickArray<GroupGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof GroupGroupByOutputType]: GetScalarType<T[P], GroupGroupByOutputType[P]>;
        }
    >
  >;

  export type GroupSelect = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    users?: boolean | UserFindManyArgs;
  };

  export type GroupInclude = {
    users?: boolean | UserFindManyArgs;
  };

  export type GroupGetPayload<S extends boolean | null | undefined | GroupArgs, U = keyof S> = S extends true
    ? Group
    : S extends undefined
    ? never
    : S extends GroupArgs | GroupFindManyArgs
    ? 'include' extends U
      ? Group &
          {
            [P in TrueKeys<S['include']>]: P extends 'users' ? Array<UserGetPayload<S['include'][P]>> : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Group
            ? Group[P]
            : P extends 'users'
            ? Array<UserGetPayload<S['select'][P]>>
            : never;
        }
      : Group
    : Group;

  type GroupCountArgs = Merge<
    Omit<GroupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true;
    }
  >;

  export interface GroupDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends GroupFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, GroupFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Group'> extends True
      ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>
      : CheckSelect<T, Prisma__GroupClient<Group | null>, Prisma__GroupClient<GroupGetPayload<T> | null>>;

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends GroupFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, GroupFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Group'> extends True
      ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>
      : CheckSelect<T, Prisma__GroupClient<Group | null>, Prisma__GroupClient<GroupGetPayload<T> | null>>;

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     *
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends GroupFindManyArgs>(
      args?: SelectSubset<T, GroupFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Group>>, PrismaPromise<Array<GroupGetPayload<T>>>>;

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     *
     **/
    create<T extends GroupCreateArgs>(
      args: SelectSubset<T, GroupCreateArgs>,
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>;

    /**
     * Create many Groups.
     *     @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     *
     **/
    delete<T extends GroupDeleteArgs>(
      args: SelectSubset<T, GroupDeleteArgs>,
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>;

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends GroupUpdateArgs>(
      args: SelectSubset<T, GroupUpdateArgs>,
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>;

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     **/
    upsert<T extends GroupUpsertArgs>(
      args: SelectSubset<T, GroupUpsertArgs>,
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>;

    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
     **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends GroupAggregateArgs>(
      args: Subset<T, GroupAggregateArgs>,
    ): PrismaPromise<GetGroupAggregateType<T>>;

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetGroupGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    users<T extends UserFindManyArgs = {}>(
      args?: Subset<T, UserFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * Throw an Error if a Group can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Group to fetch.
     **/
    where: GroupWhereUniqueInput;
  };

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * Throw an Error if a Group can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Group to fetch.
     **/
    where?: GroupWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Groups to fetch.
     **/
    orderBy?: Enumerable<GroupOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Groups.
     **/
    cursor?: GroupWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Groups from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Groups.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Groups.
     **/
    distinct?: Enumerable<GroupScalarFieldEnum>;
  };

  /**
   * Group findMany
   */
  export type GroupFindManyArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * Filter, which Groups to fetch.
     **/
    where?: GroupWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Groups to fetch.
     **/
    orderBy?: Enumerable<GroupOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Groups.
     **/
    cursor?: GroupWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Groups from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Groups.
     **/
    skip?: number;
    distinct?: Enumerable<GroupScalarFieldEnum>;
  };

  /**
   * Group create
   */
  export type GroupCreateArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * The data needed to create a Group.
     **/
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>;
  };

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs = {
    data: Enumerable<GroupCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * Group update
   */
  export type GroupUpdateArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * The data needed to update a Group.
     **/
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>;
    /**
     * Choose, which Group to update.
     **/
    where: GroupWhereUniqueInput;
  };

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs = {
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>;
    where?: GroupWhereInput;
  };

  /**
   * Group upsert
   */
  export type GroupUpsertArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * The filter to search for the Group to update in case it exists.
     **/
    where: GroupWhereUniqueInput;
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     **/
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>;
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>;
  };

  /**
   * Group delete
   */
  export type GroupDeleteArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
    /**
     * Filter which Group to delete.
     **/
    where: GroupWhereUniqueInput;
  };

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs = {
    where?: GroupWhereInput;
  };

  /**
   * Group without action
   */
  export type GroupArgs = {
    /**
     * Select specific fields to fetch from the Group
     **/
    select?: GroupSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: GroupInclude | null;
  };

  /**
   * Model List
   */

  export type AggregateList = {
    count: ListCountAggregateOutputType | null;
    avg: ListAvgAggregateOutputType | null;
    sum: ListSumAggregateOutputType | null;
    min: ListMinAggregateOutputType | null;
    max: ListMaxAggregateOutputType | null;
  };

  export type ListAvgAggregateOutputType = {
    id: number;
    intger: number | null;
    flout: number | null;
  };

  export type ListSumAggregateOutputType = {
    id: number;
    intger: number[];
    flout: number[];
  };

  export type ListMinAggregateOutputType = {
    id: number;
  };

  export type ListMaxAggregateOutputType = {
    id: number;
  };

  export type ListCountAggregateOutputType = {
    id: number;
    intger: number | null;
    flout: number | null;
    string: number | null;
    enums: number | null;
    boolean: number | null;
    _all: number;
  };

  export type ListAvgAggregateInputType = {
    id?: true;
    intger?: true;
    flout?: true;
  };

  export type ListSumAggregateInputType = {
    id?: true;
    intger?: true;
    flout?: true;
  };

  export type ListMinAggregateInputType = {
    id?: true;
  };

  export type ListMaxAggregateInputType = {
    id?: true;
  };

  export type ListCountAggregateInputType = {
    id?: true;
    intger?: true;
    flout?: true;
    string?: true;
    enums?: true;
    boolean?: true;
    _all?: true;
  };

  export type ListAggregateArgs = {
    /**
     * Filter which List to aggregate.
     **/
    where?: ListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lists to fetch.
     **/
    orderBy?: Enumerable<ListOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: ListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lists from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lists.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Lists
     **/
    count?: true | ListCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: ListAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: ListSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: ListMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: ListMaxAggregateInputType;
  };

  export type GetListAggregateType<T extends ListAggregateArgs> = {
    [P in keyof T & keyof AggregateList]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList[P]>
      : GetScalarType<T[P], AggregateList[P]>;
  };

  export type ListGroupByArgs = {
    where?: ListWhereInput;
    orderBy?: Enumerable<ListOrderByInput>;
    by: Array<ListScalarFieldEnum>;
    having?: ListScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: ListCountAggregateInputType | true;
    avg?: ListAvgAggregateInputType;
    sum?: ListSumAggregateInputType;
    min?: ListMinAggregateInputType;
    max?: ListMaxAggregateInputType;
  };

  export type ListGroupByOutputType = {
    id: number;
    intger: number[];
    flout: number[];
    string: string[];
    enums: Rols[];
    boolean: boolean[];
    count: ListCountAggregateOutputType | null;
    avg: ListAvgAggregateOutputType | null;
    sum: ListSumAggregateOutputType | null;
    min: ListMinAggregateOutputType | null;
    max: ListMaxAggregateOutputType | null;
  };

  type GetListGroupByPayload<T extends ListGroupByArgs> = Promise<
    Array<
      PickArray<ListGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof ListGroupByOutputType]: GetScalarType<T[P], ListGroupByOutputType[P]>;
        }
    >
  >;

  export type ListSelect = {
    id?: boolean;
    intger?: boolean;
    flout?: boolean;
    string?: boolean;
    enums?: boolean;
    boolean?: boolean;
  };

  export type ListGetPayload<S extends boolean | null | undefined | ListArgs, U = keyof S> = S extends true
    ? List
    : S extends undefined
    ? never
    : S extends ListArgs | ListFindManyArgs
    ? 'include' extends U
      ? List
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof List ? List[P] : never;
        }
      : List
    : List;

  type ListCountArgs = Merge<
    Omit<ListFindManyArgs, 'select' | 'include'> & {
      select?: ListCountAggregateInputType | true;
    }
  >;

  export interface ListDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one List that matches the filter.
     * @param {ListFindUniqueArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends ListFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, ListFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'List'> extends True
      ? CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>
      : CheckSelect<T, Prisma__ListClient<List | null>, Prisma__ListClient<ListGetPayload<T> | null>>;

    /**
     * Find the first List that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends ListFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, ListFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'List'> extends True
      ? CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>
      : CheckSelect<T, Prisma__ListClient<List | null>, Prisma__ListClient<ListGetPayload<T> | null>>;

    /**
     * Find zero or more Lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lists
     * const lists = await prisma.list.findMany()
     *
     * // Get first 10 Lists
     * const lists = await prisma.list.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const listWithIdOnly = await prisma.list.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ListFindManyArgs>(
      args?: SelectSubset<T, ListFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<List>>, PrismaPromise<Array<ListGetPayload<T>>>>;

    /**
     * Create a List.
     * @param {ListCreateArgs} args - Arguments to create a List.
     * @example
     * // Create one List
     * const List = await prisma.list.create({
     *   data: {
     *     // ... data to create a List
     *   }
     * })
     *
     **/
    create<T extends ListCreateArgs>(
      args: SelectSubset<T, ListCreateArgs>,
    ): CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>;

    /**
     * Create many Lists.
     *     @param {ListCreateManyArgs} args - Arguments to create many Lists.
     *     @example
     *     // Create many Lists
     *     const list = await prisma.list.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ListCreateManyArgs>(args?: SelectSubset<T, ListCreateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Delete a List.
     * @param {ListDeleteArgs} args - Arguments to delete one List.
     * @example
     * // Delete one List
     * const List = await prisma.list.delete({
     *   where: {
     *     // ... filter to delete one List
     *   }
     * })
     *
     **/
    delete<T extends ListDeleteArgs>(
      args: SelectSubset<T, ListDeleteArgs>,
    ): CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>;

    /**
     * Update one List.
     * @param {ListUpdateArgs} args - Arguments to update one List.
     * @example
     * // Update one List
     * const list = await prisma.list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ListUpdateArgs>(
      args: SelectSubset<T, ListUpdateArgs>,
    ): CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>;

    /**
     * Delete zero or more Lists.
     * @param {ListDeleteManyArgs} args - Arguments to filter Lists to delete.
     * @example
     * // Delete a few Lists
     * const { count } = await prisma.list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ListDeleteManyArgs>(args?: SelectSubset<T, ListDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ListUpdateManyArgs>(args: SelectSubset<T, ListUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one List.
     * @param {ListUpsertArgs} args - Arguments to update or create a List.
     * @example
     * // Update or create a List
     * const list = await prisma.list.upsert({
     *   create: {
     *     // ... data to create a List
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List we want to update
     *   }
     * })
     **/
    upsert<T extends ListUpsertArgs>(
      args: SelectSubset<T, ListUpsertArgs>,
    ): CheckSelect<T, Prisma__ListClient<List>, Prisma__ListClient<ListGetPayload<T>>>;

    /**
     * Count the number of Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListCountArgs} args - Arguments to filter Lists to count.
     * @example
     * // Count the number of Lists
     * const count = await prisma.list.count({
     *   where: {
     *     // ... the filter for the Lists we want to count
     *   }
     * })
     **/
    count<T extends ListCountArgs>(
      args?: Subset<T, ListCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ListAggregateArgs>(args: Subset<T, ListAggregateArgs>): PrismaPromise<GetListAggregateType<T>>;

    /**
     * Group by List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ListGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListGroupByArgs['orderBy'] }
        : { orderBy?: ListGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetListGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ListClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * List findUnique
   */
  export type ListFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * Throw an Error if a List can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which List to fetch.
     **/
    where: ListWhereUniqueInput;
  };

  /**
   * List findFirst
   */
  export type ListFindFirstArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * Throw an Error if a List can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which List to fetch.
     **/
    where?: ListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lists to fetch.
     **/
    orderBy?: Enumerable<ListOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Lists.
     **/
    cursor?: ListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lists from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lists.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Lists.
     **/
    distinct?: Enumerable<ListScalarFieldEnum>;
  };

  /**
   * List findMany
   */
  export type ListFindManyArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * Filter, which Lists to fetch.
     **/
    where?: ListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lists to fetch.
     **/
    orderBy?: Enumerable<ListOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Lists.
     **/
    cursor?: ListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lists from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lists.
     **/
    skip?: number;
    distinct?: Enumerable<ListScalarFieldEnum>;
  };

  /**
   * List create
   */
  export type ListCreateArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * The data needed to create a List.
     **/
    data: XOR<ListCreateInput, ListUncheckedCreateInput>;
  };

  /**
   * List createMany
   */
  export type ListCreateManyArgs = {
    data: Enumerable<ListCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * List update
   */
  export type ListUpdateArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * The data needed to update a List.
     **/
    data: XOR<ListUpdateInput, ListUncheckedUpdateInput>;
    /**
     * Choose, which List to update.
     **/
    where: ListWhereUniqueInput;
  };

  /**
   * List updateMany
   */
  export type ListUpdateManyArgs = {
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>;
    where?: ListWhereInput;
  };

  /**
   * List upsert
   */
  export type ListUpsertArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * The filter to search for the List to update in case it exists.
     **/
    where: ListWhereUniqueInput;
    /**
     * In case the List found by the `where` argument doesn't exist, create a new List with this data.
     **/
    create: XOR<ListCreateInput, ListUncheckedCreateInput>;
    /**
     * In case the List was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<ListUpdateInput, ListUncheckedUpdateInput>;
  };

  /**
   * List delete
   */
  export type ListDeleteArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
    /**
     * Filter which List to delete.
     **/
    where: ListWhereUniqueInput;
  };

  /**
   * List deleteMany
   */
  export type ListDeleteManyArgs = {
    where?: ListWhereInput;
  };

  /**
   * List without action
   */
  export type ListArgs = {
    /**
     * Select specific fields to fetch from the List
     **/
    select?: ListSelect | null;
  };

  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    email: 'email';
    name: 'name';
    password: 'password';
    groupId: 'groupId';
  };

  export type UserScalarFieldEnum = typeof UserScalarFieldEnum[keyof typeof UserScalarFieldEnum];

  export const PostScalarFieldEnum: {
    id: 'id';
    published: 'published';
    title: 'title';
    authorId: 'authorId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PostScalarFieldEnum = typeof PostScalarFieldEnum[keyof typeof PostScalarFieldEnum];

  export const CommentScalarFieldEnum: {
    id: 'id';
    contain: 'contain';
    postId: 'postId';
    authorId: 'authorId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type CommentScalarFieldEnum = typeof CommentScalarFieldEnum[keyof typeof CommentScalarFieldEnum];

  export const GroupScalarFieldEnum: {
    id: 'id';
    name: 'name';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type GroupScalarFieldEnum = typeof GroupScalarFieldEnum[keyof typeof GroupScalarFieldEnum];

  export const ListScalarFieldEnum: {
    id: 'id';
    intger: 'intger';
    flout: 'flout';
    string: 'string';
    enums: 'enums';
    boolean: 'boolean';
  };

  export type ListScalarFieldEnum = typeof ListScalarFieldEnum[keyof typeof ListScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = typeof QueryMode[keyof typeof QueryMode];

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>;
    OR?: Enumerable<UserWhereInput>;
    NOT?: Enumerable<UserWhereInput>;
    id?: IntFilter | number;
    createdAt?: DateTimeFilter | Date | string;
    email?: StringFilter | string;
    name?: StringNullableFilter | string | null;
    password?: StringFilter | string;
    posts?: PostListRelationFilter;
    group?: XOR<GroupRelationFilter, GroupWhereInput> | null;
    groupId?: IntNullableFilter | number | null;
    comments?: CommentListRelationFilter;
  };

  export type UserOrderByInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    password?: SortOrder;
    groupId?: SortOrder;
  };

  export type UserWhereUniqueInput = {
    id?: number;
    email?: string;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>;
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    email?: StringWithAggregatesFilter | string;
    name?: StringNullableWithAggregatesFilter | string | null;
    password?: StringWithAggregatesFilter | string;
    groupId?: IntNullableWithAggregatesFilter | number | null;
  };

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>;
    OR?: Enumerable<PostWhereInput>;
    NOT?: Enumerable<PostWhereInput>;
    id?: IntFilter | number;
    published?: BoolFilter | boolean;
    title?: StringFilter | string;
    author?: XOR<UserRelationFilter, UserWhereInput> | null;
    authorId?: IntNullableFilter | number | null;
    comments?: CommentListRelationFilter;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type PostOrderByInput = {
    id?: SortOrder;
    published?: SortOrder;
    title?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PostWhereUniqueInput = {
    id?: number;
  };

  export type PostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostScalarWhereWithAggregatesInput>;
    OR?: Enumerable<PostScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<PostScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    published?: BoolWithAggregatesFilter | boolean;
    title?: StringWithAggregatesFilter | string;
    authorId?: IntNullableWithAggregatesFilter | number | null;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
  };

  export type CommentWhereInput = {
    AND?: Enumerable<CommentWhereInput>;
    OR?: Enumerable<CommentWhereInput>;
    NOT?: Enumerable<CommentWhereInput>;
    id?: IntFilter | number;
    contain?: StringFilter | string;
    post?: XOR<PostRelationFilter, PostWhereInput>;
    postId?: IntFilter | number;
    author?: XOR<UserRelationFilter, UserWhereInput> | null;
    authorId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type CommentOrderByInput = {
    id?: SortOrder;
    contain?: SortOrder;
    postId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CommentWhereUniqueInput = {
    id?: number;
  };

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CommentScalarWhereWithAggregatesInput>;
    OR?: Enumerable<CommentScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<CommentScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    contain?: StringWithAggregatesFilter | string;
    postId?: IntWithAggregatesFilter | number;
    authorId?: IntNullableWithAggregatesFilter | number | null;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
  };

  export type GroupWhereInput = {
    AND?: Enumerable<GroupWhereInput>;
    OR?: Enumerable<GroupWhereInput>;
    NOT?: Enumerable<GroupWhereInput>;
    id?: IntFilter | number;
    name?: StringFilter | string;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
    users?: UserListRelationFilter;
  };

  export type GroupOrderByInput = {
    id?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type GroupWhereUniqueInput = {
    id?: number;
  };

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GroupScalarWhereWithAggregatesInput>;
    OR?: Enumerable<GroupScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<GroupScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    name?: StringWithAggregatesFilter | string;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
  };

  export type ListWhereInput = {
    AND?: Enumerable<ListWhereInput>;
    OR?: Enumerable<ListWhereInput>;
    NOT?: Enumerable<ListWhereInput>;
    id?: IntFilter | number;
    intger?: IntNullableListFilter;
    flout?: FloatNullableListFilter;
    string?: StringNullableListFilter;
    enums?: EnumRolsNullableListFilter;
    boolean?: BoolNullableListFilter;
  };

  export type ListOrderByInput = {
    id?: SortOrder;
    intger?: SortOrder;
    flout?: SortOrder;
    string?: SortOrder;
    enums?: SortOrder;
    boolean?: SortOrder;
  };

  export type ListWhereUniqueInput = {
    id?: number;
  };

  export type ListScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ListScalarWhereWithAggregatesInput>;
    OR?: Enumerable<ListScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<ListScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    intger?: IntNullableListFilter;
    flout?: FloatNullableListFilter;
    string?: StringNullableListFilter;
    enums?: EnumRolsNullableListFilter;
    boolean?: BoolNullableListFilter;
  };

  export type UserCreateInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    posts?: PostCreateNestedManyWithoutAuthorInput;
    group?: GroupCreateNestedOneWithoutUsersInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    groupId?: number | null;
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    posts?: PostUpdateManyWithoutAuthorInput;
    group?: GroupUpdateOneWithoutUsersInput;
    comments?: CommentUpdateManyWithoutAuthorInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    groupId?: NullableIntFieldUpdateOperationsInput | number | null;
    posts?: PostUncheckedUpdateManyWithoutAuthorInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput;
  };

  export type UserCreateManyInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    groupId?: number | null;
  };

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    groupId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type PostCreateInput = {
    published?: boolean;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: UserCreateNestedOneWithoutPostsInput;
    comments?: CommentCreateNestedManyWithoutPostInput;
  };

  export type PostUncheckedCreateInput = {
    id?: number;
    published?: boolean;
    title: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput;
  };

  export type PostUpdateInput = {
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneWithoutPostsInput;
    comments?: CommentUpdateManyWithoutPostInput;
  };

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: CommentUncheckedUpdateManyWithoutPostInput;
  };

  export type PostCreateManyInput = {
    id?: number;
    published?: boolean;
    title: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PostUpdateManyMutationInput = {
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentCreateInput = {
    contain: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    post: PostCreateNestedOneWithoutCommentsInput;
    author?: UserCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateInput = {
    id?: number;
    contain: string;
    postId: number;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentUpdateInput = {
    contain?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    post?: PostUpdateOneRequiredWithoutCommentsInput;
    author?: UserUpdateOneWithoutCommentsInput;
  };

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    contain?: StringFieldUpdateOperationsInput | string;
    postId?: IntFieldUpdateOperationsInput | number;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentCreateManyInput = {
    id?: number;
    contain: string;
    postId: number;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentUpdateManyMutationInput = {
    contain?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    contain?: StringFieldUpdateOperationsInput | string;
    postId?: IntFieldUpdateOperationsInput | number;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GroupCreateInput = {
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserCreateNestedManyWithoutGroupInput;
  };

  export type GroupUncheckedCreateInput = {
    id?: number;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: UserUncheckedCreateNestedManyWithoutGroupInput;
  };

  export type GroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUpdateManyWithoutGroupInput;
  };

  export type GroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    users?: UserUncheckedUpdateManyWithoutGroupInput;
  };

  export type GroupCreateManyInput = {
    id?: number;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ListCreateInput = {
    intger?: ListCreateintgerInput | Enumerable<number>;
    flout?: ListCreatefloutInput | Enumerable<number>;
    string?: ListCreatestringInput | Enumerable<string>;
    enums?: ListCreateenumsInput | Enumerable<Rols>;
    boolean?: ListCreatebooleanInput | Enumerable<boolean>;
  };

  export type ListUncheckedCreateInput = {
    id?: number;
    intger?: ListCreateintgerInput | Enumerable<number>;
    flout?: ListCreatefloutInput | Enumerable<number>;
    string?: ListCreatestringInput | Enumerable<string>;
    enums?: ListCreateenumsInput | Enumerable<Rols>;
    boolean?: ListCreatebooleanInput | Enumerable<boolean>;
  };

  export type ListUpdateInput = {
    intger?: ListUpdateintgerInput | Enumerable<number>;
    flout?: ListUpdatefloutInput | Enumerable<number>;
    string?: ListUpdatestringInput | Enumerable<string>;
    enums?: ListUpdateenumsInput | Enumerable<Rols>;
    boolean?: ListUpdatebooleanInput | Enumerable<boolean>;
  };

  export type ListUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    intger?: ListUpdateintgerInput | Enumerable<number>;
    flout?: ListUpdatefloutInput | Enumerable<number>;
    string?: ListUpdatestringInput | Enumerable<string>;
    enums?: ListUpdateenumsInput | Enumerable<Rols>;
    boolean?: ListUpdatebooleanInput | Enumerable<boolean>;
  };

  export type ListCreateManyInput = {
    id?: number;
    intger?: ListCreateManyintgerInput | Enumerable<number>;
    flout?: ListCreateManyfloutInput | Enumerable<number>;
    string?: ListCreateManystringInput | Enumerable<string>;
    enums?: ListCreateManyenumsInput | Enumerable<Rols>;
    boolean?: ListCreateManybooleanInput | Enumerable<boolean>;
  };

  export type ListUpdateManyMutationInput = {
    intger?: ListUpdateintgerInput | Enumerable<number>;
    flout?: ListUpdatefloutInput | Enumerable<number>;
    string?: ListUpdatestringInput | Enumerable<string>;
    enums?: ListUpdateenumsInput | Enumerable<Rols>;
    boolean?: ListUpdatebooleanInput | Enumerable<boolean>;
  };

  export type ListUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    intger?: ListUpdateintgerInput | Enumerable<number>;
    flout?: ListUpdatefloutInput | Enumerable<number>;
    string?: ListUpdatestringInput | Enumerable<string>;
    enums?: ListUpdateenumsInput | Enumerable<Rols>;
    boolean?: ListUpdatebooleanInput | Enumerable<boolean>;
  };

  export type IntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type DateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type StringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringFilter | string;
  };

  export type StringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableFilter | string | null;
  };

  export type PostListRelationFilter = {
    every?: PostWhereInput;
    some?: PostWhereInput;
    none?: PostWhereInput;
  };

  export type GroupRelationFilter = {
    is?: GroupWhereInput | null;
    isNot?: GroupWhereInput | null;
  };

  export type IntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type CommentListRelationFilter = {
    every?: CommentWhereInput;
    some?: CommentWhereInput;
    none?: CommentWhereInput;
  };

  export type IntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    count?: NestedIntFilter;
    avg?: NestedFloatFilter;
    sum?: NestedIntFilter;
    min?: NestedIntFilter;
    max?: NestedIntFilter;
  };

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    count?: NestedIntFilter;
    min?: NestedDateTimeFilter;
    max?: NestedDateTimeFilter;
  };

  export type StringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter | string;
    count?: NestedIntFilter;
    min?: NestedStringFilter;
    max?: NestedStringFilter;
  };

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    count?: NestedIntNullableFilter;
    min?: NestedStringNullableFilter;
    max?: NestedStringNullableFilter;
  };

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    count?: NestedIntNullableFilter;
    avg?: NestedFloatNullableFilter;
    sum?: NestedIntNullableFilter;
    min?: NestedIntNullableFilter;
    max?: NestedIntNullableFilter;
  };

  export type BoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type BoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    count?: NestedIntFilter;
    min?: NestedBoolFilter;
    max?: NestedBoolFilter;
  };

  export type PostRelationFilter = {
    is?: PostWhereInput;
    isNot?: PostWhereInput;
  };

  export type UserListRelationFilter = {
    every?: UserWhereInput;
    some?: UserWhereInput;
    none?: UserWhereInput;
  };

  export type IntNullableListFilter = {
    equals?: Enumerable<number> | null;
    has?: number | null;
    hasEvery?: Enumerable<number>;
    hasSome?: Enumerable<number>;
    isEmpty?: boolean;
  };

  export type FloatNullableListFilter = {
    equals?: Enumerable<number> | null;
    has?: number | null;
    hasEvery?: Enumerable<number>;
    hasSome?: Enumerable<number>;
    isEmpty?: boolean;
  };

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null;
    has?: string | null;
    hasEvery?: Enumerable<string>;
    hasSome?: Enumerable<string>;
    isEmpty?: boolean;
  };

  export type EnumRolsNullableListFilter = {
    equals?: Enumerable<Rols> | null;
    has?: Rols | null;
    hasEvery?: Enumerable<Rols>;
    hasSome?: Enumerable<Rols>;
    isEmpty?: boolean;
  };

  export type BoolNullableListFilter = {
    equals?: Enumerable<boolean> | null;
    has?: boolean | null;
    hasEvery?: Enumerable<boolean>;
    hasSome?: Enumerable<boolean>;
    isEmpty?: boolean;
  };

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>;
    createMany?: PostCreateManyAuthorInputEnvelope;
    connect?: Enumerable<PostWhereUniqueInput>;
  };

  export type GroupCreateNestedOneWithoutUsersInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput;
    connect?: GroupWhereUniqueInput;
  };

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>;
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
  };

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>;
    createMany?: PostCreateManyAuthorInputEnvelope;
    connect?: Enumerable<PostWhereUniqueInput>;
  };

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>;
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type PostUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: PostCreateManyAuthorInputEnvelope;
    connect?: Enumerable<PostWhereUniqueInput>;
    set?: Enumerable<PostWhereUniqueInput>;
    disconnect?: Enumerable<PostWhereUniqueInput>;
    delete?: Enumerable<PostWhereUniqueInput>;
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<PostScalarWhereInput>;
  };

  export type GroupUpdateOneWithoutUsersInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput;
    upsert?: GroupUpsertWithoutUsersInput;
    connect?: GroupWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>;
  };

  export type CommentUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
    set?: Enumerable<CommentWhereUniqueInput>;
    disconnect?: Enumerable<CommentWhereUniqueInput>;
    delete?: Enumerable<CommentWhereUniqueInput>;
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<CommentScalarWhereInput>;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: PostCreateManyAuthorInputEnvelope;
    connect?: Enumerable<PostWhereUniqueInput>;
    set?: Enumerable<PostWhereUniqueInput>;
    disconnect?: Enumerable<PostWhereUniqueInput>;
    delete?: Enumerable<PostWhereUniqueInput>;
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<PostScalarWhereInput>;
  };

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<CommentCreateWithoutAuthorInput>, Enumerable<CommentUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
    set?: Enumerable<CommentWhereUniqueInput>;
    disconnect?: Enumerable<CommentWhereUniqueInput>;
    delete?: Enumerable<CommentWhereUniqueInput>;
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<CommentScalarWhereInput>;
  };

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput;
    connect?: UserWhereUniqueInput;
  };

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>;
    createMany?: CommentCreateManyPostInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
  };

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>;
    createMany?: CommentCreateManyPostInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type UserUpdateOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput;
    upsert?: UserUpsertWithoutPostsInput;
    connect?: UserWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>;
  };

  export type CommentUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>;
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>;
    createMany?: CommentCreateManyPostInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
    set?: Enumerable<CommentWhereUniqueInput>;
    disconnect?: Enumerable<CommentWhereUniqueInput>;
    delete?: Enumerable<CommentWhereUniqueInput>;
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>;
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>;
    deleteMany?: Enumerable<CommentScalarWhereInput>;
  };

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    create?: XOR<Enumerable<CommentCreateWithoutPostInput>, Enumerable<CommentUncheckedCreateWithoutPostInput>>;
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutPostInput>;
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>;
    createMany?: CommentCreateManyPostInputEnvelope;
    connect?: Enumerable<CommentWhereUniqueInput>;
    set?: Enumerable<CommentWhereUniqueInput>;
    disconnect?: Enumerable<CommentWhereUniqueInput>;
    delete?: Enumerable<CommentWhereUniqueInput>;
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>;
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutPostInput>;
    deleteMany?: Enumerable<CommentScalarWhereInput>;
  };

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput;
    connect?: PostWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;
    connect?: UserWhereUniqueInput;
  };

  export type PostUpdateOneRequiredWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput;
    upsert?: PostUpsertWithoutCommentsInput;
    connect?: PostWhereUniqueInput;
    update?: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>;
  };

  export type UserUpdateOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;
    upsert?: UserUpsertWithoutCommentsInput;
    connect?: UserWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>;
  };

  export type UserCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupInput>, Enumerable<UserUncheckedCreateWithoutGroupInput>>;
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>;
    createMany?: UserCreateManyGroupInputEnvelope;
    connect?: Enumerable<UserWhereUniqueInput>;
  };

  export type UserUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupInput>, Enumerable<UserUncheckedCreateWithoutGroupInput>>;
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>;
    createMany?: UserCreateManyGroupInputEnvelope;
    connect?: Enumerable<UserWhereUniqueInput>;
  };

  export type UserUpdateManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupInput>, Enumerable<UserUncheckedCreateWithoutGroupInput>>;
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>;
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutGroupInput>;
    createMany?: UserCreateManyGroupInputEnvelope;
    connect?: Enumerable<UserWhereUniqueInput>;
    set?: Enumerable<UserWhereUniqueInput>;
    disconnect?: Enumerable<UserWhereUniqueInput>;
    delete?: Enumerable<UserWhereUniqueInput>;
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutGroupInput>;
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutGroupInput>;
    deleteMany?: Enumerable<UserScalarWhereInput>;
  };

  export type UserUncheckedUpdateManyWithoutGroupInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupInput>, Enumerable<UserUncheckedCreateWithoutGroupInput>>;
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupInput>;
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutGroupInput>;
    createMany?: UserCreateManyGroupInputEnvelope;
    connect?: Enumerable<UserWhereUniqueInput>;
    set?: Enumerable<UserWhereUniqueInput>;
    disconnect?: Enumerable<UserWhereUniqueInput>;
    delete?: Enumerable<UserWhereUniqueInput>;
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutGroupInput>;
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutGroupInput>;
    deleteMany?: Enumerable<UserScalarWhereInput>;
  };

  export type ListCreateintgerInput = {
    set: Enumerable<number>;
  };

  export type ListCreatefloutInput = {
    set: Enumerable<number>;
  };

  export type ListCreatestringInput = {
    set: Enumerable<string>;
  };

  export type ListCreateenumsInput = {
    set: Enumerable<Rols>;
  };

  export type ListCreatebooleanInput = {
    set: Enumerable<boolean>;
  };

  export type ListUpdateintgerInput = {
    set?: Enumerable<number>;
    push?: number;
  };

  export type ListUpdatefloutInput = {
    set?: Enumerable<number>;
    push?: number;
  };

  export type ListUpdatestringInput = {
    set?: Enumerable<string>;
    push?: string;
  };

  export type ListUpdateenumsInput = {
    set?: Enumerable<Rols>;
    push?: Rols;
  };

  export type ListUpdatebooleanInput = {
    set?: Enumerable<boolean>;
    push?: boolean;
  };

  export type ListCreateManyintgerInput = {
    set: Enumerable<number>;
  };

  export type ListCreateManyfloutInput = {
    set: Enumerable<number>;
  };

  export type ListCreateManystringInput = {
    set: Enumerable<string>;
  };

  export type ListCreateManyenumsInput = {
    set: Enumerable<Rols>;
  };

  export type ListCreateManybooleanInput = {
    set: Enumerable<boolean>;
  };

  export type NestedIntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type NestedDateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type NestedStringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringFilter | string;
  };

  export type NestedStringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableFilter | string | null;
  };

  export type NestedIntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type NestedIntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    count?: NestedIntFilter;
    avg?: NestedFloatFilter;
    sum?: NestedIntFilter;
    min?: NestedIntFilter;
    max?: NestedIntFilter;
  };

  export type NestedFloatFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatFilter | number;
  };

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    count?: NestedIntFilter;
    min?: NestedDateTimeFilter;
    max?: NestedDateTimeFilter;
  };

  export type NestedStringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringWithAggregatesFilter | string;
    count?: NestedIntFilter;
    min?: NestedStringFilter;
    max?: NestedStringFilter;
  };

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    count?: NestedIntNullableFilter;
    min?: NestedStringNullableFilter;
    max?: NestedStringNullableFilter;
  };

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    count?: NestedIntNullableFilter;
    avg?: NestedFloatNullableFilter;
    sum?: NestedIntNullableFilter;
    min?: NestedIntNullableFilter;
    max?: NestedIntNullableFilter;
  };

  export type NestedFloatNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatNullableFilter | number | null;
  };

  export type NestedBoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    count?: NestedIntFilter;
    min?: NestedBoolFilter;
    max?: NestedBoolFilter;
  };

  export type PostCreateWithoutAuthorInput = {
    published?: boolean;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: CommentCreateNestedManyWithoutPostInput;
  };

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number;
    published?: boolean;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput;
  };

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>;
  };

  export type PostCreateManyAuthorInputEnvelope = {
    data: Enumerable<PostCreateManyAuthorInput>;
    skipDuplicates?: boolean;
  };

  export type GroupCreateWithoutUsersInput = {
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GroupUncheckedCreateWithoutUsersInput = {
    id?: number;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GroupCreateOrConnectWithoutUsersInput = {
    where: GroupWhereUniqueInput;
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>;
  };

  export type CommentCreateWithoutAuthorInput = {
    contain: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    post: PostCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: number;
    contain: string;
    postId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>;
  };

  export type CommentCreateManyAuthorInputEnvelope = {
    data: Enumerable<CommentCreateManyAuthorInput>;
    skipDuplicates?: boolean;
  };

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>;
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>;
  };

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>;
  };

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput;
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutPostsInput>;
  };

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>;
    OR?: Enumerable<PostScalarWhereInput>;
    NOT?: Enumerable<PostScalarWhereInput>;
    id?: IntFilter | number;
    published?: BoolFilter | boolean;
    title?: StringFilter | string;
    authorId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type GroupUpsertWithoutUsersInput = {
    update: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>;
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>;
  };

  export type GroupUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GroupUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>;
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>;
  };

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>;
  };

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput;
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>;
  };

  export type CommentScalarWhereInput = {
    AND?: Enumerable<CommentScalarWhereInput>;
    OR?: Enumerable<CommentScalarWhereInput>;
    NOT?: Enumerable<CommentScalarWhereInput>;
    id?: IntFilter | number;
    contain?: StringFilter | string;
    postId?: IntFilter | number;
    authorId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type UserCreateWithoutPostsInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    group?: GroupCreateNestedOneWithoutUsersInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    groupId?: number | null;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>;
  };

  export type CommentCreateWithoutPostInput = {
    contain: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: UserCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: number;
    contain: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput;
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>;
  };

  export type CommentCreateManyPostInputEnvelope = {
    data: Enumerable<CommentCreateManyPostInput>;
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>;
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>;
  };

  export type UserUpdateWithoutPostsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    group?: GroupUpdateOneWithoutUsersInput;
    comments?: CommentUpdateManyWithoutAuthorInput;
  };

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    groupId?: NullableIntFieldUpdateOperationsInput | number | null;
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput;
  };

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput;
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>;
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>;
  };

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput;
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>;
  };

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput;
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>;
  };

  export type PostCreateWithoutCommentsInput = {
    published?: boolean;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: UserCreateNestedOneWithoutPostsInput;
  };

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: number;
    published?: boolean;
    title: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput;
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>;
  };

  export type UserCreateWithoutCommentsInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    posts?: PostCreateNestedManyWithoutAuthorInput;
    group?: GroupCreateNestedOneWithoutUsersInput;
  };

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    groupId?: number | null;
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
  };

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>;
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>;
  };

  export type PostUpdateWithoutCommentsInput = {
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneWithoutPostsInput;
  };

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>;
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
  };

  export type UserUpdateWithoutCommentsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    posts?: PostUpdateManyWithoutAuthorInput;
    group?: GroupUpdateOneWithoutUsersInput;
  };

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    groupId?: NullableIntFieldUpdateOperationsInput | number | null;
    posts?: PostUncheckedUpdateManyWithoutAuthorInput;
  };

  export type UserCreateWithoutGroupInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    posts?: PostCreateNestedManyWithoutAuthorInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateWithoutGroupInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutGroupInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>;
  };

  export type UserCreateManyGroupInputEnvelope = {
    data: Enumerable<UserCreateManyGroupInput>;
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput;
    update: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>;
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>;
  };

  export type UserUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput;
    data: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>;
  };

  export type UserUpdateManyWithWhereWithoutGroupInput = {
    where: UserScalarWhereInput;
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUsersInput>;
  };

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>;
    OR?: Enumerable<UserScalarWhereInput>;
    NOT?: Enumerable<UserScalarWhereInput>;
    id?: IntFilter | number;
    createdAt?: DateTimeFilter | Date | string;
    email?: StringFilter | string;
    name?: StringNullableFilter | string | null;
    password?: StringFilter | string;
    groupId?: IntNullableFilter | number | null;
  };

  export type PostCreateManyAuthorInput = {
    id?: number;
    published?: boolean;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateManyAuthorInput = {
    id?: number;
    contain: string;
    postId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PostUpdateWithoutAuthorInput = {
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: CommentUpdateManyWithoutPostInput;
  };

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: CommentUncheckedUpdateManyWithoutPostInput;
  };

  export type PostUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    published?: BoolFieldUpdateOperationsInput | boolean;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUpdateWithoutAuthorInput = {
    contain?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    post?: PostUpdateOneRequiredWithoutCommentsInput;
  };

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    contain?: StringFieldUpdateOperationsInput | string;
    postId?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUncheckedUpdateManyWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    contain?: StringFieldUpdateOperationsInput | string;
    postId?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentCreateManyPostInput = {
    id?: number;
    contain: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentUpdateWithoutPostInput = {
    contain?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneWithoutCommentsInput;
  };

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number;
    contain?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateManyGroupInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
  };

  export type UserUpdateWithoutGroupInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    posts?: PostUpdateManyWithoutAuthorInput;
    comments?: CommentUpdateManyWithoutAuthorInput;
  };

  export type UserUncheckedUpdateWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    posts?: PostUncheckedUpdateManyWithoutAuthorInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorInput;
  };

  export type UserUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}
