
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
 //FormGroup is responsible for binding it to the form 
  reservationform: FormGroup = new FormGroup({});

  //Injecting form builder to use it in our reservation form component
  constructor(
    //Form builder to build out real form group with the inputs
    private formbuilder: FormBuilder,
    private reservationservice: ReservationService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //pic all the forms control from html and group together multiple controls
    this.reservationform = this.formbuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]], //for multiple validators create an array
      roomNumber: ['', Validators.required]
    });

    // Fetch the reservation ID from the URL
    // let id = this.activatedroute.snapshot.paramMap.get('id');

    // if (id) {
    //   // Fetch existing reservation data
    //   let reservation = this.reservationservice.getReservationById(id);
    //   if (reservation) {
    //     // Populate the form with the existing reservation data
    //     this.reservationform.patchValue(reservation);
    //   }
    // }

    let id = this.activatedroute.snapshot.paramMap.get('id')
    if(id)
    {
      this.reservationservice.getReservationById(id).subscribe(
        reservation => {
          if(reservation)
            this.reservationform.patchValue(reservation)
        }
      )
    }
  }
  

  onSubmit() {
    if (this.reservationform.valid) {
      const reservations: Reservation = this.reservationform.value;

      const id = this.activatedroute.snapshot.paramMap.get('id');

      if (id) {
        // Update existing reservation
        this.reservationservice.updateReservation(id, reservations).subscribe(()=>
        {
          console.log("Update request is processed")
        });
      } else {
        // Create new reservation
        this.reservationservice.createReservation(reservations).subscribe(()=>{
          console.log("create request is processed")
        });
      }

      // Redirect to reservation list - Once the user has created the reservation it will redirect the user back to reservation list
      this.router.navigate(['/list']);
    }
  }
}

