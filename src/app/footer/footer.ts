import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LazyComponent } from '../lazy-component/lazy-component';
import { SDKApplicationManager } from 'sdk';

@Component({
    standalone: true,
    selector: 'app-footer',
    templateUrl: './footer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LazyComponent
    ]
})
export class FooterComponent implements OnInit {
    menus = signal<any[]>([]);

    private readonly applicationManager = inject(SDKApplicationManager);

    ngOnInit() {

        this.applicationManager
        .cacheDynamicImport<any[]>(() => import(`./menus/menus.${this.applicationManager.lang}.ts`), 'footerMenu', [])
        .then(m => {
            this.menus.set(m);
        });
    }
}