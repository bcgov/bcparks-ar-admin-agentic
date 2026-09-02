import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockConfigService = jasmine.createSpyObj('ConfigService', {}, { config: { ENVIRONMENT: 'prod'} });
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
      'getWelcomeMessage',
      'isAllowed',
      'isAuthenticated',
      'isAuthorized',
      'logout',
    ]);
    mockKeycloakService.isAllowed.and.returnValue(true);
    mockKeycloakService.isAuthenticated.and.returnValue(false);
    mockKeycloakService.isAuthorized.and.returnValue(false);
    mockKeycloakService.getWelcomeMessage.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [NgbCollapseModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: ConfigService, useValue: mockConfigService
        },
        {
          provide: KeycloakService, useValue: mockKeycloakService
        },
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  it('should create and not show the banner', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(component.showBanner).toBe(false);
  });

  it('shows a log out control when authenticated and invokes Keycloak logout', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.getWelcomeMessage.and.returnValue('Jane Doe');

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const logoutButtons = fixture.debugElement.queryAll(
      By.css('button')
    ).filter((button) => button.nativeElement.textContent.trim() === 'Log out');

    expect(logoutButtons.length).toBeGreaterThan(0);
    logoutButtons[0].nativeElement.click();

    expect(mockKeycloakService.logout).toHaveBeenCalledTimes(1);
  });
});
