/* eslint-disable @typescript-eslint/no-explicit-any */
type DataObject = {
    [key: string]: any;
};

type NonNullablePropertyNames<T> = {
    [P in keyof T]: T[P] extends null | undefined ? never : P;
}[keyof T];

type FieldsWithValue<T> = Pick<T, NonNullablePropertyNames<T>>;

type Serialized<T> = {
    [P in keyof FieldsWithValue<T>]: string;
};

type Deserialized<From, To> = keyof From extends NonNullablePropertyNames<To>
    ? {
        [P in keyof From]: To[P];
    }
    : never;

/**
 * Prepares objects to be stored as Redis hashes and restore it as typed objects
 */
export class Serializer {
    /**
     * Stringifies object values, omits `null` and `undefined` values
     *
     * @param dataObject
     */
    public static serialize<From extends DataObject>(
        dataObject: From,
    ): Serialized<From> {
        const serialized: Serialized<From> = Object.create(null);

        Object.entries(dataObject).reduce(
            (acc, entry: [string, any]) => {
                const [key, value] = entry;
                if ([null, undefined].includes(value)) {
                    return acc;
                }
                acc[key as keyof Serialized<From>] = JSON.stringify(value);

                return acc;
            },
            serialized,
        );

        return serialized;
    }

    /**
     * Deserializes from an object of type Serialized<To> to an object of type To
     *
     * @param data
     *
     * @example Usage:
     * type TEntity = { name: string }
     * const entity = Serializer.deserialize<TEntity>({ name: '"Bob"'})
     * entity.name // "bob"
     * entity.unknownProp // TSError
     */
    public static deserialize<
        To,
        From = Serialized<To>,
        Result extends Deserialized<From, To> = Deserialized<From, To>
    >(data: From): Result {
        const deserialized: Result = Object.create(null);
        Object.entries(data)
            .reduce((acc, entry: [string, any]) => {
                const [key, value] = entry;

                try {
                    acc[key as keyof Result] = JSON.parse(value);
                } catch {
                    acc[key as keyof Result] = value;
                }

                return acc;
            }, deserialized);

        return deserialized;
    }
}
