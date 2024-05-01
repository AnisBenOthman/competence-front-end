export class User {
    public id!: number;
    public nom!: string;
    public prenom!: string;
    public pays!: string;

    constructor(id:number, nom:string,prenom:string,pays:string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.pays = pays;

    }
}