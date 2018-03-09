import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeatsManagerService, SimpleSeatsManagerService } from './seats-manager/seats-manager.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ISeats } from './seats-manager/ISeats';
import { ISeat } from './seats-manager/ISeat';
import { environment } from '../../environments/environment';

@Component({
    selector: 'welcome-component',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    providers: [
        { provide: SeatsManagerService, useClass: SimpleSeatsManagerService }
    ]
})
export class WelcomeComponent implements OnInit {
    title = 'app';
    public name: string;
    public tableNumber: number;

    public wasSubmitted: boolean;
    public previousName;
    public invited: ISeats;

    constructor(public SimpleSeatsManagerService: SeatsManagerService,
        private http: HttpClient) { }

    ngOnInit() {
        this.wasSubmitted = false;
        this.previousName = null;
        this.SimpleSeatsManagerService.init();
        this.SimpleSeatsManagerService.getData().subscribe(data => {
            this.invited = data;
            this.invited.guests = this.invited.guests.filter((guest) => guest.name != this.name);
        });
    }

    public onSubmit(): void {
        this.previousName = this.name;
        this.tableNumber = this.SimpleSeatsManagerService.getSeat(this.name);
        if (this.tableNumber >= 0) {
            this.showSuccess();
            this.invited.guests = this.invited.guests.filter((guest) => guest.name != this.name);
            this.updateJson(this.name);
        }
        else {
            this.wasSubmitted = false;
        }

        this.name = null;
    }

    private showSuccess() {
        this.wasSubmitted = true;
    }

    private updateJson(name: string): void {
        //let url = `http://michalandassaf.000webhostapp.com/server.php`;
        let tmpName = name;
        this.http.post<string>(environment.apiUrl + "/server.php", {
            invitee: tmpName
        }).subscribe(res => {
            console.log(res);
        }, res => {
            alert("could not notify " + name + " arrived :( ");
        })
    }
}
