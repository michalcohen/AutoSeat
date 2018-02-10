import { Component } from '@angular/core';
import { SeatsManagerService, SimpleSeatsManagerService } from './seats-manager/seats-manager.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        { provide: SeatsManagerService, useClass: SimpleSeatsManagerService }
    ]
})
export class AppComponent implements OnInit {
    title = 'app';
    public firstName: string;
    public lastName: string;
    public tableNumber: number;

    public wasSubmitted: boolean;
    public previousFirstName;

    constructor(private SimpleSeatsManagerService: SeatsManagerService) { }

    ngOnInit() {
        this.wasSubmitted = false;
        this.previousFirstName = null;
        this.SimpleSeatsManagerService.init();
    }

    public onSubmit(): void {
        this.previousFirstName = this.firstName;
        this.tableNumber = this.SimpleSeatsManagerService.getSeat(this.firstName, this.lastName);
        
        this.showSuccess();

        this.firstName = null;
        this.lastName = null;
    }

    private showSuccess() {
        this.wasSubmitted = true;
    }
}
