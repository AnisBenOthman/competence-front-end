import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affectation } from '../models/affectation.model';


@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  urlApi: string = "http://127.0.0.1:9090/competenceEmploye/";

  constructor(private http:HttpClient) { }
  getAffectationByUser(id : number){
    return this.http.get<Affectation[]>(this.urlApi + "employe/" + id);
  }
  addAffectation(idUser:number, idCompetence: number, nv:{niveau: number}){
    return this.http.post(this.urlApi+idUser+'/'+idCompetence, nv);
  }
  deleteAffectation(id: number){
    return this.http.delete(this.urlApi + id);
  }
}
