import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISeat } from './ISeat';
import { ISeats } from './ISeats';

@Injectable()
export abstract class SeatsManagerService {
    getSeat: (firstName: string, lastName: string) => number
    init: () => void
}

@Injectable()
export class SimpleSeatsManagerService implements SeatsManagerService {

    private allSeats: ISeats;

    constructor(private http: HttpClient) { 
        this.allSeats = { guests: [] };
    }

    public init(): void {
        this.getData().subscribe(data => {
            this.allSeats.guests = data.guests;
        });
    }

    public getSeat(firstName: string, lastName: string): number {
        let seat: ISeat = this.allSeats.guests.find((seat: ISeat) => {
            return seat.firstName === firstName && seat.lastName === lastName;
        });
        if (!seat) {
            console.error(`no such guest named: ${firstName} ${lastName}`);
        }
        return seat.tableNumber;
    }

    private getData() {
        return this.http.get<ISeats>('./assets/datastore/invitedSeats.json');
    }
}
