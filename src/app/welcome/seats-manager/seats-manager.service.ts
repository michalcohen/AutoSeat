import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISeat } from './ISeat';
import { ISeats } from './ISeats';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class SeatsManagerService {
    allSeats: ISeats;

    getSeat: (name: string) => number
    init: () => void
    getData: () => Observable<ISeats>
    setTable: (name: string, tableNumber: number) => void
    setHasArrived: (name: string, hasArrived: boolean) => void
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
        return this.http.get<ISeats>('../assets/datastore/invitedSeats.json');
    }

    public setTable(name: string, tableNumber: number) {
        let invitedName: string = name;
        let tableNum: number = tableNumber;
        this.http.post<string>(environment.apiUrl + "server-edit-table.php", {
            tableNumber: tableNum,
            name: invitedName
        }).subscribe(res => {
            console.log(res);
        }, res => {
            alert("could not update the table number");
        })
    }

    public setHasArrived(name: string, hasArrived: boolean) {
        this.serverSetHasArrived(name, hasArrived);
        this.clientSetHasArrived(name, hasArrived);
    }

    private serverSetHasArrived(name: string, hasArrived: boolean) {
        let invitedName: string = name;
        let arrived: boolean = hasArrived;
        this.http.post<string>(environment.apiUrl + "server-edit-has-arrived.php", {
            hasArrived: arrived,
            name: invitedName
        }).subscribe(res => {
            console.log(res);
        }, res => {
            alert(`could not notify ${name} has arrived \ not arrived`);
        })
    }

    private clientSetHasArrived(name: string, hasArrived: boolean) {
        let guestIndex: number = this.allSeats.guests.findIndex((guest: ISeat) => guest.name === name);
        let x = this.allSeats.guests[guestIndex].hasArrived;
        x = !x;      
    }
}
