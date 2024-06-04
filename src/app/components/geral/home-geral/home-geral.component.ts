import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HorarioComponent } from '../../horario/horario.component';
import { ImageBase64Component } from '../../image-base64/image-base64.component';
import { FooterComponent } from '../../footer/footer.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'home-geral',
    standalone: true,
    imports: [MatInputModule, MatAutocompleteModule, ReactiveFormsModule, FormsModule, MatSelectModule, AsyncPipe, HorarioComponent, ImageBase64Component, FooterComponent],
    templateUrl: './home-geral.component.html',
    styleUrl: './home-geral.component.css',
})
export class HomeGeralComponent implements OnInit {
    tecnicos: string = '';
    solicitante: string = '';
    item: string = '';
    motivoDoLaudo: string = '';
    aparencia: string = '';
    parecerTecnico: string = '';
    modelo: string = '';
    horarioPai = '';

    // data e horario no pdf
    atualizarHorarioPai(novoHorario: string) {
        this.horarioPai = novoHorario;
    }

    // pegando as imagens do outro componente
    imagem: string[] = [];

    onCarregarImagem(img: string[]) {
        this.imagem = img;
        // console.log(this.imagem);
    }

    marcarEquipamento = new FormControl('');
    optionsMarca: string[] = ['Samsung', 'LG', 'WorldPC', 'Multilaser', 'K-Mex | Gaming Master', 'Duex', 'Fortrek', 'HP', 'HQ', 'AOC', 'Zox | HeadSet', 'BR'];
    filteredOptions: Observable<string[]> | undefined;

    ngOnInit() {
        //filter do input select MARCA
        this.filteredOptions = this.marcarEquipamento.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    // filter das marcas do equipamento
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.optionsMarca.filter(option => option.toLowerCase().includes(filterValue));
    }
    // select Técnico responsável
    tecnicosResponsavel: any = [
        { value: 'Carlos Eduardo Albuquerque', viewValue: 'Carlos Eduardo' },
    ];
    // select
    colaboradorSolicitante: any = [
        { value: 'Funcionário 1', viewValue: 'Funcionário 1 | Devolução' },
        { value: 'Funcionário 2', viewValue: 'Funcionário 2 | Devolução' },
        { value: 'Funcionário 3', viewValue: 'Funcionário 3 | Devolução' },
    ];

    gerarPdf() {
        const docDefinition: any = {
            content: [
                {
                    columns: [
                        { image: `${this.imagem}`, width: 60, height: 60 },
                        {
                            text: [
                                { text: 'GALÁXIA COMUNICAÇÕES LTDA\n', style: 'header' },
                                { text: 'CNPJ: 03.234.567/0001-89, TELEFONE: (97) 3456-7890\n', style: 'subheader' },
                                { text: 'ENDEREÇO: RUA ESTELAR, Nº 200, LOTE 20, QUADRA 60-B, CONJUNTO\n', style: 'subheader' },
                                { text: 'COSMOS, CEP 65.700-000, SÃO LUÍS – MA\n', style: 'subheader' },

                            ],
                            margin: [10, 10, 0, 0], // direita, cima, esquerda, baixo
                        },
                    ],
                },
                '\n\n\n',
                { text: 'LAUDO TÉCNICO', style: 'tituloLaudoTecnico', margin: [200, 0, 0, 0] },
                '\n\n\n',

                {
                    text: [
                        { text: `${this.horarioPai}`, style: 'horario' }, // Alinhe à direita
                    ],
                    margin: [0, 0, 15, 5], //direita, cima, esqueda, baixo
                },

                {
                    margin: [20, 0],
                    table: {
                        widths: [230, 230],
                        heights: [18, 55, 18, 55, 18, 40, 18, 40],
                        body: [
                            // parecer Tecnico
                            [{ text: 'Responsável Técnico e Solicitante:', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    border: [true, true, false, true], //direita, cima, esqueda, baixo
                                    text: ['\n', { text: 'Técnico: ', style: 'tituloComponents' }, { text: `${this.tecnicos}`, style: 'valueTituloComponents' }, '\n'],
                                    // margin: [10, 10, 0, 0],
                                },
                                {
                                    border: [false, true, true, true],
                                    text: ['\n', { text: 'Solicitante: ', style: 'tituloComponents' }, { text: `${this.solicitante}`, style: 'valueTituloComponents' }, '\n'],
                                },
                            ],
                            [{ text: 'Informações Do Equipamento', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    border: [true, true, false, true], //direita, cima, esqueda, baixo
                                    text: [
                                        '\n',
                                        { text: 'Item: ', style: 'tituloComponents' },
                                        { text: `${this.item}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Modelo: ', style: 'tituloComponents' },
                                        { text: `${this.modelo}`, style: 'valueTituloComponents' },
                                    ],
                                    // margin: [10, 10, 0, 0],
                                },
                                {
                                    border: [false, true, true, true],
                                    text: [
                                        '\n',
                                        { text: 'Marca: ', style: 'tituloComponents' },
                                        { text: `${this.marcarEquipamento.value}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Aparência: ', style: 'tituloComponents' },
                                        { text: `${this.aparencia}`, style: 'valueTituloComponents' },
                                    ],
                                },
                            ],
                            // motivo da solicitação do laudo
                            [{ text: 'Motivo da Solicitação do Laudo:', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    border: [true, true, true, true], //direita, cima, esqueda, baixo
                                    text: ` \n ${this.motivoDoLaudo}`,
                                    style: 'descricaoMotivoSolicitacao',
                                    colSpan: 2,
                                },
                                {},
                            ],

                            // parecer Tecnico
                            [{ text: 'Parecer Técnico:', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    border: [true, true, true, true], //direita, cima, esqueda, baixo
                                    text: `\n ${this.parecerTecnico}`,
                                    style: 'descricaoParecerTecnico',
                                    colSpan: 2,
                                },
                                {},
                            ],
                        ],
                    },
                },
                // Linha horizontal (traço)
                [
                    {
                        image: this.verificarImgAssinatura(this.tecnicos),
                        width: this.verificarTamnhoAssinatura(this.tecnicos, 'width'),
                        height: this.verificarTamnhoAssinatura(this.tecnicos, 'height'),
                        style: this.verificarStyleAssinatura(this.tecnicos, 'styleAssinatura'),
                    }, //direita, cima, esqueda, baixo
                    {
                        canvas: [{ type: 'line', x1: 135, y1: 100, x2: 380, y2: 100, lineWidth: 1 }],
                    }, //x1: direita,
                    {
                        margin: [145, 3, 0, 0],
                        text: [
                            { text: 'Técnico Responsável: ', fontSize: 9, bold: true },
                            { text: `${this.tecnicos}`, fontSize: 9 },
                        ],
                    },
                ],
            ],
            styles: {
                styleAssinatura: {
                    margin: [160, 100, 20, -100],
                },
                tituloLaudoTecnico: {
                    fontSize: 15,
                    bold: true,
                },
                header: {
                    fontSize: 12,
                    bold: true,
                    decoration: 'underline',
                },
                horario: {
                    fontSize: 10,
                    bold: true,
                    alignment: 'right',
                },
                subheader: {
                    fontSize: 8,
                },
                tableHeader: {
                    fontSize: 13,
                    bold: true,
                },
                tituloComponents: {
                    fontSize: 11,
                    bold: true,
                },
                valueTituloComponents: {
                    fontSize: 11,
                },
                descricaoMotivoSolicitacao: {
                    fontSize: 11,
                },
                descricaoParecerTecnico: {
                    fontSize: 11,
                },
            },
        };
        const pdf = pdfMake.createPdf(docDefinition);

        return pdf;
    }

    // ---------------------------- Verificações ------------------------

    // verificar qual tecnico ta fazendo o laudo e colocar a imagem da assinatura correspondente
    verificarImgAssinatura(value: string) {
        if (value == 'Carlos Eduardo Albuquerque') {
            return this.imagem[1];
        } else if (value == 'Breno Nascimento') {
            return this.imagem[2];
        } else {
            return alert('Assinatura Invalida');
        }
    }

    //Aplicando o tamnho Width e Height na assinatura
    verificarTamnhoAssinatura(value: string, propriedade: any) {
        if (value == 'Carlos Eduardo Albuquerque') {
            if (propriedade == 'width') {
                return 200;
            } else if (propriedade == 'height') {
                return 30;
            }
        } else if (value == 'Breno Nascimento') {
            if (propriedade == 'width') {
                return 150;
            } else if (propriedade == 'height') {
                return 40;
            }
        }

        // Se não for correspondido nenhum dos casos anteriores, lança uma exceção.
        throw new Error('Combinação de técnico e propriedade inválida');
    }

    //aplicando a margin no style da assinatura
    verificarStyleAssinatura(value: string, styleAssinatura: any) {
        if (value == this.tecnicos) {
            return styleAssinatura;
        }
    }

    // button de gerar e visualizar PDF
    onVisualizarPdf() {
        if (this.tecnicos == 'Carlos Eduardo Albuquerque' || this.tecnicos == 'Breno Nascimento') {
            if (this.solicitante !== '' && this.item !== '') {
                const pdf = this.gerarPdf();
                pdf.open();
            } else {
                alert('Os campos Solicitante e Item tem que esta preenchidos');
                return;
            }
        } else {
            alert('Selecione algum Técnico Responsável');
            return;
        }
    }

    onBaixarPdf() {
        if (this.tecnicos == 'Carlos Eduardo Albuquerque' || this.tecnicos == 'Breno Nascimento') {
            if (this.solicitante.trim() !== '' && this.item.trim() !== '') {
                const pdf = this.gerarPdf();
                pdf.download('Laudo Geral.pdf');
            } else {
                alert('Os campos Solicitante e Item tem que esta preenchidos');
                return;
            }
        } else {
            alert('Selecione algum Técnico Responsável');
            return;
        }
    }
}
