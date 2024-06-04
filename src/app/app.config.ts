import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, UserRound, PcCase, Smartphone, Printer, FileText } from 'lucide-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';


export const appConfig: ApplicationConfig = {
    // withHashLocation() :  colocando # na URL e quando voce coloca uma url nao configurada, ele redireciona pra a home.
    //se voce tirar a hash, quando voce colocar alguma url diferente das configuradas,
    //vai sumir a pagina (home ou qualquer outra da tela).
    providers: [provideRouter(routes, withHashLocation()), 
        importProvidersFrom(
            LucideAngularModule.pick({
                UserRound,
                PcCase,
                Smartphone,
                Printer,
                FileText,

            })
        ), provideAnimationsAsync(), provideEnvironmentNgxMask()
    ],
};
