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
 * Model Admin
 */

export type Admin = {
  id: number;
  createdAt: Date;
  email: string;
  name: string | null;
  password: string;
};

/**
 * Model Log
 */

export type Log = {
  id: number;
  title: string;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
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
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
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
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   */
  get admin(): Prisma.AdminDelegate<GlobalReject>;

  /**
   * `prisma.log`: Exposes CRUD operations for the **Log** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Logs
   * const logs = await prisma.log.findMany()
   * ```
   */
  get log(): Prisma.LogDelegate<GlobalReject>;
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
    Admin: 'Admin';
    Log: 'Log';
  };

  export type ModelName = typeof ModelName[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
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
   * Model Admin
   */

  export type AggregateAdmin = {
    count: AdminCountAggregateOutputType | null;
    avg: AdminAvgAggregateOutputType | null;
    sum: AdminSumAggregateOutputType | null;
    min: AdminMinAggregateOutputType | null;
    max: AdminMaxAggregateOutputType | null;
  };

  export type AdminAvgAggregateOutputType = {
    id: number;
  };

  export type AdminSumAggregateOutputType = {
    id: number;
  };

  export type AdminMinAggregateOutputType = {
    id: number;
    createdAt: Date | null;
    email: string | null;
    name: string | null;
    password: string | null;
  };

  export type AdminMaxAggregateOutputType = {
    id: number;
    createdAt: Date | null;
    email: string | null;
    name: string | null;
    password: string | null;
  };

  export type AdminCountAggregateOutputType = {
    id: number;
    createdAt: number | null;
    email: number | null;
    name: number | null;
    password: number | null;
    _all: number;
  };

  export type AdminAvgAggregateInputType = {
    id?: true;
  };

  export type AdminSumAggregateInputType = {
    id?: true;
  };

  export type AdminMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
  };

  export type AdminMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
  };

  export type AdminCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    email?: true;
    name?: true;
    password?: true;
    _all?: true;
  };

  export type AdminAggregateArgs = {
    /**
     * Filter which Admin to aggregate.
     **/
    where?: AdminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Admins to fetch.
     **/
    orderBy?: Enumerable<AdminOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: AdminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Admins from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Admins.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Admins
     **/
    count?: true | AdminCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: AdminAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: AdminSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: AdminMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: AdminMaxAggregateInputType;
  };

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
    [P in keyof T & keyof AggregateAdmin]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>;
  };

  export type AdminGroupByArgs = {
    where?: AdminWhereInput;
    orderBy?: Enumerable<AdminOrderByInput>;
    by: Array<AdminScalarFieldEnum>;
    having?: AdminScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: AdminCountAggregateInputType | true;
    avg?: AdminAvgAggregateInputType;
    sum?: AdminSumAggregateInputType;
    min?: AdminMinAggregateInputType;
    max?: AdminMaxAggregateInputType;
  };

  export type AdminGroupByOutputType = {
    id: number;
    createdAt: Date;
    email: string;
    name: string | null;
    password: string;
    count: AdminCountAggregateOutputType | null;
    avg: AdminAvgAggregateOutputType | null;
    sum: AdminSumAggregateOutputType | null;
    min: AdminMinAggregateOutputType | null;
    max: AdminMaxAggregateOutputType | null;
  };

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Promise<
    Array<
      PickArray<AdminGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof AdminGroupByOutputType]: GetScalarType<T[P], AdminGroupByOutputType[P]>;
        }
    >
  >;

  export type AdminSelect = {
    id?: boolean;
    createdAt?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
    logs?: boolean | LogFindManyArgs;
  };

  export type AdminInclude = {
    logs?: boolean | LogFindManyArgs;
  };

  export type AdminGetPayload<S extends boolean | null | undefined | AdminArgs, U = keyof S> = S extends true
    ? Admin
    : S extends undefined
    ? never
    : S extends AdminArgs | AdminFindManyArgs
    ? 'include' extends U
      ? Admin &
          {
            [P in TrueKeys<S['include']>]: P extends 'logs' ? Array<LogGetPayload<S['include'][P]>> : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Admin
            ? Admin[P]
            : P extends 'logs'
            ? Array<LogGetPayload<S['select'][P]>>
            : never;
        }
      : Admin
    : Admin;

  type AdminCountArgs = Merge<
    Omit<AdminFindManyArgs, 'select' | 'include'> & {
      select?: AdminCountAggregateInputType | true;
    }
  >;

  export interface AdminDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends AdminFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, AdminFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Admin'> extends True
      ? CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
      : CheckSelect<T, Prisma__AdminClient<Admin | null>, Prisma__AdminClient<AdminGetPayload<T> | null>>;

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends AdminFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, AdminFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Admin'> extends True
      ? CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>
      : CheckSelect<T, Prisma__AdminClient<Admin | null>, Prisma__AdminClient<AdminGetPayload<T> | null>>;

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     *
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends AdminFindManyArgs>(
      args?: SelectSubset<T, AdminFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Admin>>, PrismaPromise<Array<AdminGetPayload<T>>>>;

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     *
     **/
    create<T extends AdminCreateArgs>(
      args: SelectSubset<T, AdminCreateArgs>,
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>;

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     *
     **/
    delete<T extends AdminDeleteArgs>(
      args: SelectSubset<T, AdminDeleteArgs>,
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>;

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends AdminUpdateArgs>(
      args: SelectSubset<T, AdminUpdateArgs>,
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>;

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     **/
    upsert<T extends AdminUpsertArgs>(
      args: SelectSubset<T, AdminUpsertArgs>,
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>;

    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
     **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(
      args: Subset<T, AdminAggregateArgs>,
    ): PrismaPromise<GetAdminAggregateType<T>>;

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetAdminGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AdminClient<T> implements PrismaPromise<T> {
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

    logs<T extends LogFindManyArgs = {}>(
      args?: Subset<T, LogFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Log>>, PrismaPromise<Array<LogGetPayload<T>>>>;

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
   * Admin findUnique
   */
  export type AdminFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * Throw an Error if a Admin can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Admin to fetch.
     **/
    where: AdminWhereUniqueInput;
  };

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * Throw an Error if a Admin can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Admin to fetch.
     **/
    where?: AdminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Admins to fetch.
     **/
    orderBy?: Enumerable<AdminOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Admins.
     **/
    cursor?: AdminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Admins from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Admins.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Admins.
     **/
    distinct?: Enumerable<AdminScalarFieldEnum>;
  };

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * Filter, which Admins to fetch.
     **/
    where?: AdminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Admins to fetch.
     **/
    orderBy?: Enumerable<AdminOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Admins.
     **/
    cursor?: AdminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Admins from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Admins.
     **/
    skip?: number;
    distinct?: Enumerable<AdminScalarFieldEnum>;
  };

  /**
   * Admin create
   */
  export type AdminCreateArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * The data needed to create a Admin.
     **/
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>;
  };

  /**
   * Admin update
   */
  export type AdminUpdateArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * The data needed to update a Admin.
     **/
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>;
    /**
     * Choose, which Admin to update.
     **/
    where: AdminWhereUniqueInput;
  };

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs = {
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>;
    where?: AdminWhereInput;
  };

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * The filter to search for the Admin to update in case it exists.
     **/
    where: AdminWhereUniqueInput;
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     **/
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>;
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>;
  };

  /**
   * Admin delete
   */
  export type AdminDeleteArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
    /**
     * Filter which Admin to delete.
     **/
    where: AdminWhereUniqueInput;
  };

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs = {
    where?: AdminWhereInput;
  };

  /**
   * Admin without action
   */
  export type AdminArgs = {
    /**
     * Select specific fields to fetch from the Admin
     **/
    select?: AdminSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: AdminInclude | null;
  };

  /**
   * Model Log
   */

  export type AggregateLog = {
    count: LogCountAggregateOutputType | null;
    avg: LogAvgAggregateOutputType | null;
    sum: LogSumAggregateOutputType | null;
    min: LogMinAggregateOutputType | null;
    max: LogMaxAggregateOutputType | null;
  };

  export type LogAvgAggregateOutputType = {
    id: number;
    authorId: number | null;
  };

  export type LogSumAggregateOutputType = {
    id: number;
    authorId: number | null;
  };

  export type LogMinAggregateOutputType = {
    id: number;
    title: string | null;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type LogMaxAggregateOutputType = {
    id: number;
    title: string | null;
    authorId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type LogCountAggregateOutputType = {
    id: number;
    title: number | null;
    authorId: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    _all: number;
  };

  export type LogAvgAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type LogSumAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type LogMinAggregateInputType = {
    id?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type LogMaxAggregateInputType = {
    id?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type LogCountAggregateInputType = {
    id?: true;
    title?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type LogAggregateArgs = {
    /**
     * Filter which Log to aggregate.
     **/
    where?: LogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Logs to fetch.
     **/
    orderBy?: Enumerable<LogOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: LogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Logs from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Logs.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Logs
     **/
    count?: true | LogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: LogAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: LogSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: LogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: LogMaxAggregateInputType;
  };

  export type GetLogAggregateType<T extends LogAggregateArgs> = {
    [P in keyof T & keyof AggregateLog]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog[P]>
      : GetScalarType<T[P], AggregateLog[P]>;
  };

  export type LogGroupByArgs = {
    where?: LogWhereInput;
    orderBy?: Enumerable<LogOrderByInput>;
    by: Array<LogScalarFieldEnum>;
    having?: LogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: LogCountAggregateInputType | true;
    avg?: LogAvgAggregateInputType;
    sum?: LogSumAggregateInputType;
    min?: LogMinAggregateInputType;
    max?: LogMaxAggregateInputType;
  };

  export type LogGroupByOutputType = {
    id: number;
    title: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date;
    count: LogCountAggregateOutputType | null;
    avg: LogAvgAggregateOutputType | null;
    sum: LogSumAggregateOutputType | null;
    min: LogMinAggregateOutputType | null;
    max: LogMaxAggregateOutputType | null;
  };

  type GetLogGroupByPayload<T extends LogGroupByArgs> = Promise<
    Array<
      PickArray<LogGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof LogGroupByOutputType]: GetScalarType<T[P], LogGroupByOutputType[P]>;
        }
    >
  >;

  export type LogSelect = {
    id?: boolean;
    title?: boolean;
    author?: boolean | AdminArgs;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type LogInclude = {
    author?: boolean | AdminArgs;
  };

  export type LogGetPayload<S extends boolean | null | undefined | LogArgs, U = keyof S> = S extends true
    ? Log
    : S extends undefined
    ? never
    : S extends LogArgs | LogFindManyArgs
    ? 'include' extends U
      ? Log &
          {
            [P in TrueKeys<S['include']>]: P extends 'author' ? AdminGetPayload<S['include'][P]> | null : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Log
            ? Log[P]
            : P extends 'author'
            ? AdminGetPayload<S['select'][P]> | null
            : never;
        }
      : Log
    : Log;

  type LogCountArgs = Merge<
    Omit<LogFindManyArgs, 'select' | 'include'> & {
      select?: LogCountAggregateInputType | true;
    }
  >;

  export interface LogDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Log that matches the filter.
     * @param {LogFindUniqueArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends LogFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args: SelectSubset<T, LogFindUniqueArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Log'> extends True
      ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>
      : CheckSelect<T, Prisma__LogClient<Log | null>, Prisma__LogClient<LogGetPayload<T> | null>>;

    /**
     * Find the first Log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends LogFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined
    >(
      args?: SelectSubset<T, LogFindFirstArgs>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Log'> extends True
      ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>
      : CheckSelect<T, Prisma__LogClient<Log | null>, Prisma__LogClient<LogGetPayload<T> | null>>;

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.log.findMany()
     *
     * // Get first 10 Logs
     * const logs = await prisma.log.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const logWithIdOnly = await prisma.log.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends LogFindManyArgs>(
      args?: SelectSubset<T, LogFindManyArgs>,
    ): CheckSelect<T, PrismaPromise<Array<Log>>, PrismaPromise<Array<LogGetPayload<T>>>>;

    /**
     * Create a Log.
     * @param {LogCreateArgs} args - Arguments to create a Log.
     * @example
     * // Create one Log
     * const Log = await prisma.log.create({
     *   data: {
     *     // ... data to create a Log
     *   }
     * })
     *
     **/
    create<T extends LogCreateArgs>(
      args: SelectSubset<T, LogCreateArgs>,
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>;

    /**
     * Delete a Log.
     * @param {LogDeleteArgs} args - Arguments to delete one Log.
     * @example
     * // Delete one Log
     * const Log = await prisma.log.delete({
     *   where: {
     *     // ... filter to delete one Log
     *   }
     * })
     *
     **/
    delete<T extends LogDeleteArgs>(
      args: SelectSubset<T, LogDeleteArgs>,
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>;

    /**
     * Update one Log.
     * @param {LogUpdateArgs} args - Arguments to update one Log.
     * @example
     * // Update one Log
     * const log = await prisma.log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends LogUpdateArgs>(
      args: SelectSubset<T, LogUpdateArgs>,
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>;

    /**
     * Delete zero or more Logs.
     * @param {LogDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends LogDeleteManyArgs>(args?: SelectSubset<T, LogDeleteManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends LogUpdateManyArgs>(args: SelectSubset<T, LogUpdateManyArgs>): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Log.
     * @param {LogUpsertArgs} args - Arguments to update or create a Log.
     * @example
     * // Update or create a Log
     * const log = await prisma.log.upsert({
     *   create: {
     *     // ... data to create a Log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log we want to update
     *   }
     * })
     **/
    upsert<T extends LogUpsertArgs>(
      args: SelectSubset<T, LogUpsertArgs>,
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>;

    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.log.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
     **/
    count<T extends LogCountArgs>(
      args?: Subset<T, LogCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogAggregateArgs>(args: Subset<T, LogAggregateArgs>): PrismaPromise<GetLogAggregateType<T>>;

    /**
     * Group by Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogGroupByArgs} args - Group by arguments.
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
      T extends LogGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogGroupByArgs['orderBy'] }
        : { orderBy?: LogGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, LogGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetLogGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LogClient<T> implements PrismaPromise<T> {
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

    author<T extends AdminArgs = {}>(
      args?: Subset<T, AdminArgs>,
    ): CheckSelect<T, Prisma__AdminClient<Admin | null>, Prisma__AdminClient<AdminGetPayload<T> | null>>;

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
   * Log findUnique
   */
  export type LogFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * Throw an Error if a Log can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Log to fetch.
     **/
    where: LogWhereUniqueInput;
  };

  /**
   * Log findFirst
   */
  export type LogFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * Throw an Error if a Log can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Log to fetch.
     **/
    where?: LogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Logs to fetch.
     **/
    orderBy?: Enumerable<LogOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Logs.
     **/
    cursor?: LogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Logs from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Logs.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Logs.
     **/
    distinct?: Enumerable<LogScalarFieldEnum>;
  };

  /**
   * Log findMany
   */
  export type LogFindManyArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * Filter, which Logs to fetch.
     **/
    where?: LogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Logs to fetch.
     **/
    orderBy?: Enumerable<LogOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Logs.
     **/
    cursor?: LogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Logs from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Logs.
     **/
    skip?: number;
    distinct?: Enumerable<LogScalarFieldEnum>;
  };

  /**
   * Log create
   */
  export type LogCreateArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * The data needed to create a Log.
     **/
    data: XOR<LogCreateInput, LogUncheckedCreateInput>;
  };

  /**
   * Log update
   */
  export type LogUpdateArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * The data needed to update a Log.
     **/
    data: XOR<LogUpdateInput, LogUncheckedUpdateInput>;
    /**
     * Choose, which Log to update.
     **/
    where: LogWhereUniqueInput;
  };

  /**
   * Log updateMany
   */
  export type LogUpdateManyArgs = {
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>;
    where?: LogWhereInput;
  };

  /**
   * Log upsert
   */
  export type LogUpsertArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * The filter to search for the Log to update in case it exists.
     **/
    where: LogWhereUniqueInput;
    /**
     * In case the Log found by the `where` argument doesn't exist, create a new Log with this data.
     **/
    create: XOR<LogCreateInput, LogUncheckedCreateInput>;
    /**
     * In case the Log was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<LogUpdateInput, LogUncheckedUpdateInput>;
  };

  /**
   * Log delete
   */
  export type LogDeleteArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
    /**
     * Filter which Log to delete.
     **/
    where: LogWhereUniqueInput;
  };

  /**
   * Log deleteMany
   */
  export type LogDeleteManyArgs = {
    where?: LogWhereInput;
  };

  /**
   * Log without action
   */
  export type LogArgs = {
    /**
     * Select specific fields to fetch from the Log
     **/
    select?: LogSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: LogInclude | null;
  };

  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AdminScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    email: 'email';
    name: 'name';
    password: 'password';
  };

  export type AdminScalarFieldEnum = typeof AdminScalarFieldEnum[keyof typeof AdminScalarFieldEnum];

  export const LogScalarFieldEnum: {
    id: 'id';
    title: 'title';
    authorId: 'authorId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type LogScalarFieldEnum = typeof LogScalarFieldEnum[keyof typeof LogScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

  /**
   * Deep Input Types
   */

  export type AdminWhereInput = {
    AND?: Enumerable<AdminWhereInput>;
    OR?: Enumerable<AdminWhereInput>;
    NOT?: Enumerable<AdminWhereInput>;
    id?: IntFilter | number;
    createdAt?: DateTimeFilter | Date | string;
    email?: StringFilter | string;
    name?: StringNullableFilter | string | null;
    password?: StringFilter | string;
    logs?: LogListRelationFilter;
  };

  export type AdminOrderByInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    password?: SortOrder;
  };

  export type AdminWhereUniqueInput = {
    id?: number;
    email?: string;
  };

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AdminScalarWhereWithAggregatesInput>;
    OR?: Enumerable<AdminScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<AdminScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    email?: StringWithAggregatesFilter | string;
    name?: StringNullableWithAggregatesFilter | string | null;
    password?: StringWithAggregatesFilter | string;
  };

  export type LogWhereInput = {
    AND?: Enumerable<LogWhereInput>;
    OR?: Enumerable<LogWhereInput>;
    NOT?: Enumerable<LogWhereInput>;
    id?: IntFilter | number;
    title?: StringFilter | string;
    author?: XOR<AdminRelationFilter, AdminWhereInput> | null;
    authorId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type LogOrderByInput = {
    id?: SortOrder;
    title?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type LogWhereUniqueInput = {
    id?: number;
  };

  export type LogScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LogScalarWhereWithAggregatesInput>;
    OR?: Enumerable<LogScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<LogScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    title?: StringWithAggregatesFilter | string;
    authorId?: IntNullableWithAggregatesFilter | number | null;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
  };

  export type AdminCreateInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    logs?: LogCreateNestedManyWithoutAuthorInput;
  };

  export type AdminUncheckedCreateInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
    logs?: LogUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type AdminUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    logs?: LogUpdateManyWithoutAuthorInput;
  };

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    logs?: LogUncheckedUpdateManyWithoutAuthorInput;
  };

  export type AdminUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  export type LogCreateInput = {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: AdminCreateNestedOneWithoutLogsInput;
  };

  export type LogUncheckedCreateInput = {
    id?: number;
    title: string;
    authorId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type LogUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: AdminUpdateOneWithoutLogsInput;
  };

  export type LogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type LogUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type LogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
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
    not?: NestedStringNullableFilter | string | null;
  };

  export type LogListRelationFilter = {
    every?: LogWhereInput;
    some?: LogWhereInput;
    none?: LogWhereInput;
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
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    count?: NestedIntNullableFilter;
    min?: NestedStringNullableFilter;
    max?: NestedStringNullableFilter;
  };

  export type AdminRelationFilter = {
    is?: AdminWhereInput | null;
    isNot?: AdminWhereInput | null;
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

  export type LogCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<LogCreateWithoutAuthorInput>, Enumerable<LogUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutAuthorInput>;
    connect?: Enumerable<LogWhereUniqueInput>;
  };

  export type LogUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<LogCreateWithoutAuthorInput>, Enumerable<LogUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutAuthorInput>;
    connect?: Enumerable<LogWhereUniqueInput>;
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

  export type LogUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<LogCreateWithoutAuthorInput>, Enumerable<LogUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<LogUpsertWithWhereUniqueWithoutAuthorInput>;
    connect?: Enumerable<LogWhereUniqueInput>;
    set?: Enumerable<LogWhereUniqueInput>;
    disconnect?: Enumerable<LogWhereUniqueInput>;
    delete?: Enumerable<LogWhereUniqueInput>;
    update?: Enumerable<LogUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<LogUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<LogScalarWhereInput>;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type LogUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<Enumerable<LogCreateWithoutAuthorInput>, Enumerable<LogUncheckedCreateWithoutAuthorInput>>;
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<LogUpsertWithWhereUniqueWithoutAuthorInput>;
    connect?: Enumerable<LogWhereUniqueInput>;
    set?: Enumerable<LogWhereUniqueInput>;
    disconnect?: Enumerable<LogWhereUniqueInput>;
    delete?: Enumerable<LogWhereUniqueInput>;
    update?: Enumerable<LogUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<LogUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<LogScalarWhereInput>;
  };

  export type AdminCreateNestedOneWithoutLogsInput = {
    create?: XOR<AdminCreateWithoutLogsInput, AdminUncheckedCreateWithoutLogsInput>;
    connectOrCreate?: AdminCreateOrConnectWithoutLogsInput;
    connect?: AdminWhereUniqueInput;
  };

  export type AdminUpdateOneWithoutLogsInput = {
    create?: XOR<AdminCreateWithoutLogsInput, AdminUncheckedCreateWithoutLogsInput>;
    connectOrCreate?: AdminCreateOrConnectWithoutLogsInput;
    upsert?: AdminUpsertWithoutLogsInput;
    connect?: AdminWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<AdminUpdateWithoutLogsInput, AdminUncheckedUpdateWithoutLogsInput>;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
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

  export type LogCreateWithoutAuthorInput = {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type LogUncheckedCreateWithoutAuthorInput = {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type LogCreateOrConnectWithoutAuthorInput = {
    where: LogWhereUniqueInput;
    create: XOR<LogCreateWithoutAuthorInput, LogUncheckedCreateWithoutAuthorInput>;
  };

  export type LogUpsertWithWhereUniqueWithoutAuthorInput = {
    where: LogWhereUniqueInput;
    update: XOR<LogUpdateWithoutAuthorInput, LogUncheckedUpdateWithoutAuthorInput>;
    create: XOR<LogCreateWithoutAuthorInput, LogUncheckedCreateWithoutAuthorInput>;
  };

  export type LogUpdateWithWhereUniqueWithoutAuthorInput = {
    where: LogWhereUniqueInput;
    data: XOR<LogUpdateWithoutAuthorInput, LogUncheckedUpdateWithoutAuthorInput>;
  };

  export type LogUpdateManyWithWhereWithoutAuthorInput = {
    where: LogScalarWhereInput;
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyWithoutLogsInput>;
  };

  export type LogScalarWhereInput = {
    AND?: Enumerable<LogScalarWhereInput>;
    OR?: Enumerable<LogScalarWhereInput>;
    NOT?: Enumerable<LogScalarWhereInput>;
    id?: IntFilter | number;
    title?: StringFilter | string;
    authorId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type AdminCreateWithoutLogsInput = {
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
  };

  export type AdminUncheckedCreateWithoutLogsInput = {
    id?: number;
    createdAt?: Date | string;
    email: string;
    name?: string | null;
    password: string;
  };

  export type AdminCreateOrConnectWithoutLogsInput = {
    where: AdminWhereUniqueInput;
    create: XOR<AdminCreateWithoutLogsInput, AdminUncheckedCreateWithoutLogsInput>;
  };

  export type AdminUpsertWithoutLogsInput = {
    update: XOR<AdminUpdateWithoutLogsInput, AdminUncheckedUpdateWithoutLogsInput>;
    create: XOR<AdminCreateWithoutLogsInput, AdminUncheckedCreateWithoutLogsInput>;
  };

  export type AdminUpdateWithoutLogsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  export type AdminUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
  };

  export type LogUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type LogUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type LogUncheckedUpdateManyWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
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
