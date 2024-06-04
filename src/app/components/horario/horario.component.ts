import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'horario',
    standalone: true,
    imports: [],
    templateUrl: './horario.component.html',
})
export class HorarioComponent implements OnInit {
    @Output() horarioAtual: EventEmitter<string> = new EventEmitter<string>();
    horario: string = '';
    intervalId: any;


    OnDestroy() {
        // destruindo o evento
        this.paraAtualizacaoHorario();
    }

    ngOnInit(): void {
        this.iniciarAtualizacaoHorario();
    }

    iniciarAtualizacaoHorario() {
        this.atualizarHorario(); // Atualize imediatamente ao iniciar

        this.intervalId = setInterval(() => {
            this.atualizarHorario();
        }, 1000);
    }

    paraAtualizacaoHorario() {
        clearInterval(this.intervalId);
    }

    atualizarHorario() {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());
        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
        this.horario = `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`;

        // Emitir o evento para o componente pai
        this.horarioAtual.emit(this.horario);
    }
}
