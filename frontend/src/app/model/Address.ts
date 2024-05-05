export class Address {
    id: string = '';
    street: string = '';
    number: string = '';
    complement: string = '';
    neighborhood: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    country: string = 'Brasil';
    userId: string = '';

    constructor(userId: string) {
        this.userId = userId;
    }
}