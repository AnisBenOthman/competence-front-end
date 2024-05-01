import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string =  "http://127.0.0.1:9090/employe/";
  apiPays : string = "https://restcountries.com/v3.1/all"
  constructor(private http:HttpClient) { }
  getUsers(){
    return  this.http.get<User[]>(this.apiUrl);
  }
  getUserById(id:number){
    return this.http.get<User>(this.apiUrl+id);
}

addUser(user:User){
   return this.http.post(this.apiUrl, user);
}

getPays(){
  
  return this.http.get<any>(this.apiPays);
}
  
updateUser(id: number , user: User ){
  return this.http.put(this.apiUrl + id, user );
}

  
}
