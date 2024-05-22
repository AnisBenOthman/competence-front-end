import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affectation } from '../models/affectation.model';


@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  urlApi: string = "http://127.0.0.1:9090/competenceEmploye/";
  urlTeam : string = "http://127.0.0.1:9090/competenceEmploye/getTeam";

  constructor(private http:HttpClient) { }
  getAffectationByUser(id : number){
    return this.http.get<Affectation[]>(this.urlApi + "employe/" + id);
  }
  getCompetenceTeam(){
return this.http.get<any>(this.urlTeam);
  }
  addAffectation(idUser:number, idCompetence: number, nv:{niveau: number}){
    return this.http.post(this.urlApi+idUser+'/'+idCompetence, nv);
  }
  updateAffectationEmploye(idEmploye : number, body: {niveau : number}){
    return this.http.put(this.urlApi + idEmploye, body);
  }
  deleteAffectation(id: number){
    return this.http.delete(this.urlApi + id);
  }
  getAffectationPays(body : {pays : string | null} ){
    return this.http.post<any[]>(this.urlApi + '/pays',body )
  }
  getCompetencePays(id: string){
    return this.http.get<any[]>(this.urlApi + "competencespays/" + id );
  }
  getCompetences(){
    return this.http.get<string[]>(this.urlApi + "competences")
  }
  getAffectationbyCompetence(id : number){
    return this.http.get<Affectation[]>(this.urlApi + "competence/" + id);
  }
}
