import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Competence } from 'src/app/competence/competence.model';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  urlApi:string ="http://127.0.0.1:9090/competence/"
  constructor(private http: HttpClient) { }
  getAllCompetences(){
    return this.http.get<Competence[]>(this.urlApi);
  }
  getCompetenceById(id:number){
    return this.http.get<Competence>(this.urlApi+'id/'+id);
  }
  addCompetence(body: Competence){
    return this.http.post(this.urlApi, body)
  }
}
