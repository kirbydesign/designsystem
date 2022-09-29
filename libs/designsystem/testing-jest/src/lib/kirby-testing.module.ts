// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../../../../../node_modules/@types/jest/index.d.ts' />

import { NgModule } from '@angular/core';

import { KirbyTestingBaseModule } from '@kirbydesign/designsystem/testing-base';

import { MOCK_PROVIDERS } from './mock-providers';

@NgModule({
  imports: [KirbyTestingBaseModule],
  exports: [KirbyTestingBaseModule],
  providers: [...MOCK_PROVIDERS],
})
export class KirbyTestingModule {}
