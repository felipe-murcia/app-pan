import { FieldError } from "../interfaces/FieldError";

export const filterError = (key: string, errors: FieldError[]) => {
    return errors.filter((error:FieldError) => error.key === key);
}