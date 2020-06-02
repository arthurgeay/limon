export class User {
    constructor(public email: string, 
                public password: string, 
                public birthday?: any, 
                public fullname?: string) {}
}