import expect from 'expect';
import { authorsFormattedForDropdown } from "./selectors";

describe('Author Selectors', () => {
    describe('authorsFormattedForDropdown', () => {
        it('should return formatted author data', () => {
            const authors = [
                { id: 'cory-house', firstName: 'Cory', lastName: 'House' },
                { id: 'matt-house', firstName: 'Matt', lastName: 'House' }
            ];

            const expected = [
                { value: 'cory-house', text: 'Cory House' },
                { value: 'matt-house', text: 'Matt House' }
            ];

            expect(authorsFormattedForDropdown(authors)).toEqual(expected);
        });
    });
});