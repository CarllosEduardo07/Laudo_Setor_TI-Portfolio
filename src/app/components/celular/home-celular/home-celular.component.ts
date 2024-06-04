import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FooterComponent } from '../../footer/footer.component';
import { HorarioComponent } from '../../horario/horario.component';
import { ImageBase64Component } from '../../image-base64/image-base64.component';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'home-celular',
    standalone: true,
    imports: [FormsModule, MatInputModule, MatSelectModule, NgxMaskDirective, NgxMaskPipe, FooterComponent, ImageBase64Component, HorarioComponent],
    templateUrl: './home-celular.component.html',
    styleUrl: './home-celular.component.css',
})
export class HomeCelularComponent{
    marca: string = '';
    modelo: string = '';
    numero: string = '';
    imei1!: number; //quer dizer o valor pode ser numero ou undefined
    imei2!: number; //quer dizer o valor pode ser numero ou undefined
    telaTrincada: string = '';
    touchScreen: string = '';
    altoFalanteAuricular: string = '';
    altoFalante: string = '';
    microfone: string = '';
    entradaDoCarregador: string = '';
    veioCarregador!: string;
    estadoDoCarregador!: string;
    solicitante: string = '';
    tecnicos: string = '';

    motivoDoLaudo: string = '';
    parecerTecnico: string = '';
    horarioPai = '';

    // select
    colaboradorSolicitante: any = [
        { value: 'Funcionário 1', viewValue: 'Funcionário 1 | Devolução' },
        { value: 'Funcionário 2', viewValue: 'Funcionário 2 | Devolução' },
        { value: 'Funcionário 3', viewValue: 'Funcionário 3 | Devolução' },
    ];



    onHorarioAtual(novoHorario: string) {
        this.horarioPai = novoHorario;
    }

    imagem: string[] = [];

    onCarregarImagem(img: string[]) {
        this.imagem = img;
    }

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
                '\n\n',
                { text: 'Laudo Técnico: Avaliação de Celular', style: 'tituloLaudoTecnico', margin: [0, 10, 0, 10], alignment: 'center' },
                '\n\n',

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
                        heights: [18, 55, 18, 60, 18, 75, 18, 40, 18, 50],
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
                            [{ text: 'Informações do Aparelho', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    border: [true, true, false, true], //direita, cima, esqueda, baixo
                                    text: [
                                        '\n',
                                        { text: 'Marca: ', style: 'tituloComponents' },
                                        { text: `${this.marca}`, style: 'valueTituloComponents' },
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
                                        { text: 'Imei 1: ', style: 'tituloComponents' },
                                        { text: `${this.imei1}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Imei 2: ', style: 'tituloComponents' },
                                        { text: `${this.imei2}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Número: ', style: 'tituloComponents' },
                                        { text: `${this.numero}`, style: 'valueTituloComponents' },
                                    ],
                                },
                            ],

                            [{ text: 'Status Atual do Aparelho', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],

                            [
                                {
                                    border: [true, true, false, true], //direita, cima, esqueda, baixo
                                    text: [
                                        '\n',
                                        { text: 'Tela Trincada: ', style: 'tituloComponents' },
                                        { text: `${this.telaTrincada}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Touch Screen: ', style: 'tituloComponents' },
                                        { text: `${this.touchScreen}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Veio Carregador? : ', style: 'tituloComponents' },
                                        { text: `${this.veioCarregador}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Estado do Carregador: ', style: 'tituloComponents' },
                                        { text: `${this.estadoDoCarregador}`, style: 'valueTituloComponents' },
                                    ],
                                    // margin: [10, 10, 0, 0],
                                },
                                {
                                    border: [false, true, true, true],
                                    text: [
                                        '\n',
                                        { text: 'Alto-Falante Auricular: ', style: 'tituloComponents' },
                                        { text: `${this.altoFalanteAuricular}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Alto-Falante: ', style: 'tituloComponents' },
                                        { text: `${this.altoFalante}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Microfone: ', style: 'tituloComponents' },
                                        { text: `${this.microfone}`, style: 'valueTituloComponents' },
                                        '\n',
                                        { text: 'Entrada do Carregador: ', style: 'tituloComponents' },
                                        { text: `${this.entradaDoCarregador}`, style: 'valueTituloComponents' },
                                    ],
                                },
                            ],

                            // motivo da solicitação do laudo
                            [{ text: 'Motivo da Solicitação do Laudo:', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    margin: [3, 5, 0, 0],
                                    border: [true, true, true, true], //direita, cima, esqueda, baixo
                                    text: `${this.motivoDoLaudo}`,
                                    style: 'descricaoMotivoSolicitacao',
                                    colSpan: 2,
                                },
                                {},
                            ],

                            // parecer Tecnico
                            [{ text: 'Parecer Técnico:', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                            [
                                {
                                    margin: [3, 5, 0, 0],
                                    border: [true, true, true, true], //direita, cima, esqueda, baixo
                                    text: `${this.parecerTecnico}`,
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
            if (this.solicitante !== '' && this.marca !== '') {
                const pdf = this.gerarPdf();
                pdf.open();
            } else {
                alert('Os campos Solicitante e Marca tem que esta preenchidos');
                return;
            }
        } else {
            alert('Selecione algum Técnico Responsável');
            return;
        }
    }

    onBaixarPdf() {
        if (this.tecnicos == 'Carlos Eduardo Albuquerque' || this.tecnicos == 'Breno Nascimento') {
            if (this.solicitante !== '' && this.marca !== '') {
                const pdf = this.gerarPdf();
                pdf.download('Laudo Celular.pdf');
            } else {
                alert('Os campos Solicitante e Marca tem que esta preenchidos');
                return;
            }
        } else {
            alert('Selecione algum Técnico Responsável');
            return;
        }
    }
}
