import { Component ,OnInit} from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  //property for data binding
  reservations:Reservation[]=[];
  //created the constructor for injecting the reservation service
  constructor(private reservationservice:ReservationService)
  {
  }
  //Lifecycle hooks- ngOnInit to load the data from local storage
  ngOnInit(): void {
    //load the resrvations from the reservation service and store them into the property created reservations
      //this.reservations = this.reservationservice.getReservation()
      this.reservationservice.getReservation().subscribe( reservations =>{
        this.reservations = reservations
      });
  }

  // deleteReservation(id:string)
  // {
  //   this.reservationservice.deleteReservation(id);
  //   //this.reservations = this.reservationservice.getReservation();//Refresh the list after deletion
  // }

  deleteReservation(id:string)
  {
    this.reservationservice.deleteReservation(id).subscribe(()=>{
      console.log("Delete request is processed");
    })
  }

}
