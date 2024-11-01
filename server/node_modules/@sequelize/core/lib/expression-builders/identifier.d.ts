import { BaseSqlExpression, SQL_IDENTIFIER } from './base-sql-expression.js';
/**
 * Use {@link identifier} instead.
 */
export declare class Identifier extends BaseSqlExpression {
    readonly value: string;
    protected readonly [SQL_IDENTIFIER]: 'identifier';
    constructor(value: string);
}
/**
 * Used to represent a value that will either be escaped to a literal, or a bind parameter.
 * Unlike {@link attribute} and {@link col}, this identifier will be escaped as-is,
 * without mapping to a column name or any other transformation.
 *
 * @param value
 * @example
 * ```ts
 * sequelize.query(sql`SELECT * FROM users WHERE ${identifier('firstName')} = 'John'`);
 * ```
 *
 * Will generate (identifier quoting depending on the dialect):
 *
 * ```sql
 * SELECT * FROM users WHERE "firstName" = 'John'
 * ```
 */
export declare function identifier(value: string): Identifier;
