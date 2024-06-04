import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'footer',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    @Output() visualizarPdf: EventEmitter<any> = new EventEmitter();
    @Output() baixarPdf: EventEmitter<any> = new EventEmitter();

    eventClickVisualizarPdf() {
        this.visualizarPdf.emit();
    }
    eventClickBaixarPdf() {
        this.baixarPdf.emit();
    }
}
