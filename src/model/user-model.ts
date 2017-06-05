export class UserModel {


    constructor(
        public displayName: string,
        public email: string,
        public photoURL: string,
        public providerId: string,
        public uid: string,
        public id: string
    ) { }
}
