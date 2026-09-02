import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricalPillComponent } from './historical-pill.component';

describe('HistoricalPillComponent', () => {
  let component: HistoricalPillComponent;
  let fixture: ComponentFixture<HistoricalPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalPillComponent]
    });
    fixture = TestBed.createComponent(HistoricalPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should highlight typeahead properly', async() => {
    expect(component.getHighlightedMatch({value:'string'}, ['str'])).toEqual({
      left: '',
      highlight: 'str',
      right: 'ing'}
    )
  })

  it('renders malicious sub-area names as text', () => {
    const maliciousName = '<img src=x onerror=alert(1)>';
    component.matches = [{
      value: maliciousName,
      item: { value: { isLegacy: false } }
    }];
    component.query = ['img'];
    component.typeaheadTemplateMethods = {
      isActive: () => false,
      selectMatch: () => {},
      selectActive: () => {}
    };

    fixture.detectChanges();

    const pill = fixture.nativeElement.querySelector('li');
    expect(pill.textContent).toContain(maliciousName);
    expect(pill.querySelector('img')).toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
