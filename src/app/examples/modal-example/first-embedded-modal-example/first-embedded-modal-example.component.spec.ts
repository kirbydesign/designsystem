import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../../kirby/kirby.module';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example.component';
import { ModalUidProvider } from '~/kirby/components/modal/modal-uid-provider';

describe('FirstEmbeddedModalExampleComponent', () => {
  let component: FirstEmbeddedModalExampleComponent;
  let fixture: ComponentFixture<FirstEmbeddedModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [FirstEmbeddedModalExampleComponent],
      providers: [{ provide: ModalUidProvider, useValue: { uid: 0 } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstEmbeddedModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
