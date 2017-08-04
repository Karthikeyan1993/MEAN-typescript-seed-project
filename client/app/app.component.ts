import { Component } from '@angular/core';

import { HttpClientService } from './shared/services/http-client.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [HttpClientService]
})
export class AppComponent {
}
