import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'lazy-component',
    templateUrl: './lazy-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink
    ]
})
export class LazyComponent {

}