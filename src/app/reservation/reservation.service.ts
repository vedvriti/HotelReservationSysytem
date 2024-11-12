import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations:Reservation[]=[]
  //constructor is invoked when we create the instance of reservation service
  // constructor() {
  //   //localStorage.getItem() method to attempt to retrieve a value associated with the key "reservations" from the browser's local storage.
  //   //localStorage is a web storage API that allows you to store key-value pairs in a web browser, persisting even after the browser is closed.
  //   let savedreservation = localStorage.getItem("reservations");
  //   this.reservations = savedreservation? JSON.parse(savedreservation):[]
  //  }
  private apiurl="http://localhost:3001"

  constructor(private http:HttpClient){}
  //CRUD Operations
  // getReservation(): Reservation[]{
  //   return this.reservations;
  // }

  getReservation():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiurl + "/reservation")
  }

  // getReservationById(id:string):Reservation|undefined{
  //  return this.reservations.find(res=>res.id == id);
  // }
   
  getReservationById(id:string):Observable<Reservation>
  {
    return this.http.get<Reservation>(this.apiurl+"/reservation/"+id)
  }

  // createReservation(reservation:Reservation):void{
  //   reservation.id = Date.now().toString();
  //    this.reservations.push(reservation);
  //   //  console.log(this.reservations);
  //   //localStorage.setItem("reservations",JSON.stringify(this.reservations))
  // }

  createReservation(reservation:Reservation):Observable<void>
  {
    return this.http.post<void>(this.apiurl+"/reservation",reservation)
  }

  // deleteReservation(id:string):void{
  //   let index = this.reservations.findIndex(res=>res.id == id)
  //   this.reservations.splice(index,1)
  //   //localStorage.setItem("reservations",JSON.stringify(this.reservations))
  // }

  deleteReservation(id:string):Observable<void>{
    return this.http.delete<void>(this.apiurl+"/reservation/"+id)
  }

  // updateReservation(id:string,updatedReservation:Reservation):void{
  //    let index = this.reservations.findIndex(res=>res.id == id)
  //    this.reservations[index]=updatedReservation;//go to that index and switch the entire content
  //    //localStorage.setItem("reservations",JSON.stringify(this.reservations))
  // }

  updateReservation(id:string,updatedReservation:Reservation):Observable<void>{
    return this.http.put<void>(this.apiurl+ "/reservation/"+ id,updatedReservation)
  }
}
