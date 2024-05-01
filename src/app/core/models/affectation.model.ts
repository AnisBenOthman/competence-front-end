import { Competence } from "src/app/competence/competence.model";
import { User } from "src/app/user/user.model";

export class Affectation{
    id !: number;
    employe!: User;
    competence!: Competence;
    niveau!: number; 
}