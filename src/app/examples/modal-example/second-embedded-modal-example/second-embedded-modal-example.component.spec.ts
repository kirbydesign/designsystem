import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../../kirby/kirby.module';
import { SecondEmbeddedModalExampleComponent } from './second-embedded-modal-example.component';
import { ModalUidProvider } from '~/kirby/components/modal/modal-uid-provider';

describe('SecondEmbeddedModalExampleComponent', () => {
  let component: SecondEmbeddedModalExampleComponent;
  let fixture: ComponentFixture<SecondEmbeddedModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [SecondEmbeddedModalExampleComponent],
      providers: [{ provide: ModalUidProvider, useValue: { uid: 0 } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondEmbeddedModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
