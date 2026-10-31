
import { TestBed } from '@angular/core/testing';
import { Pelicula } from './pelicula';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Pelicula', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pelicula],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('debería crearse', () => {
    const fixture = TestBed.createComponent(Pelicula);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
