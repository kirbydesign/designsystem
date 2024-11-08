export const moduleProviderExample = `
import { LOCALE_ID, NgModule } from '@angular/core';

@NgModule({
    ...
    providers: [
        { provide: LOCALE_ID, useValue: 'da' },
    ],
    ...
})
export class AppModule {}
`;
