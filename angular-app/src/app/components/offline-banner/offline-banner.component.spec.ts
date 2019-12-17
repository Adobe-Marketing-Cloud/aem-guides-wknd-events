import { async, TestBed } from '@angular/core/testing';
import { OfflineBannerComponent } from './offline-banner.component';

describe('OfflineBannerComponent', () => {
  let onLineSpy: jasmine.Spy;

  const fireWindowEvent = eventType => {
    let evt = new Event(eventType);
    window.dispatchEvent(evt);
  };

  const createFixture = () => {
    const fixture = TestBed.createComponent(OfflineBannerComponent);
    fixture.detectChanges();
    return fixture;
  };

  const mockOnLine = isOnline => {
    onLineSpy.and.returnValue(isOnline);
  };

  beforeAll(() => {
    onLineSpy = spyOnProperty(Navigator.prototype, 'onLine');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineBannerComponent]
    }).compileComponents();
  }));

  it('does not render when online', () => {
    // Start online
    mockOnLine(true);

    // Banner should not render
    const bannerElement: HTMLElement = createFixture().nativeElement;
    expect(bannerElement.children.length).toBe(0);
  });

  it('renders when offline', () => {
    // Start offline
    mockOnLine(false);

    // Banner should render
    const bannerElement: HTMLElement = createFixture().nativeElement;
    const span = bannerElement.querySelector('.offline-banner-title');
    expect(span.innerHTML).toContain('You are offline.');
  });

  it('handles connection changes correctly', () => {
    // Start offline
    mockOnLine(false);

    // Render banner
    const fixture = createFixture();
    const bannerElement: HTMLElement = fixture.nativeElement;

    // Go online
    mockOnLine(true);
    fireWindowEvent('online');

    // Banner should not render
    fixture.detectChanges();
    expect(bannerElement.children.length).toBe(0);

    // Go offline
    mockOnLine(false);
    fireWindowEvent('offline');

    // Banner should render
    fixture.detectChanges();
    const span = bannerElement.querySelector('.offline-banner-title');
    expect(span.innerHTML).toContain('You are offline.');
  });
});
