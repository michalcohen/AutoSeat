import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISeat } from './ISeat';
import { ISeats } from './ISeats';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class SeatsManagerService {
    getSeat: (name: string) => number
    init: () => void
    getData: () => Observable<ISeats>
}

@Injectable()
export class SimpleSeatsManagerService implements SeatsManagerService {

    public allSeats: ISeats;

    constructor(private http: HttpClient) { 
        this.allSeats = { guests: [] };
    }

    public init(): void {
        this.getData().subscribe(data => {
            this.allSeats.guests = data.guests;
        });
    }

    public getSeat(name: string): number {
        let seat: ISeat = this.allSeats.guests.find((seat: ISeat) => {
            return seat.name === name;
        });
        if (!seat) {
            window.alert(`no such guest named: ${name} `);
            console.error(`no such guest named: ${name} `);
            return -1;
        }
        return seat.tableNumber;
    }

    public getData(): Observable<ISeats> {
        return this.http.get<ISeats>('./assets/datastore/invitedSeats.json');
    }
}
