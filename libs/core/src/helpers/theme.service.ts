import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'kirby-theme-mode';
  private readonly LIGHT_CLASS = 'kirby-theme-light';
  private readonly DARK_CLASS = 'kirby-theme-dark';

  private themeSubject = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  public theme$: Observable<ThemeMode> = this.themeSubject.asObservable();

  private mediaQueryList: MediaQueryList | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize theme service:
   * 1. Apply initial theme
   * 2. Listen to OS preference changes
   */
  private initialize(): void {
    this.applyTheme(this.themeSubject.value);
    this.listenToOsPreference();
  }

  /**
   * Get initial theme:
   * 1. Check localStorage for saved preference
   * 2. If not found, detect from OS preference
   * 3. Fallback to 'light' if detection not supported
   */
  private getInitialTheme(): ThemeMode {
    // Check localStorage first
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    // Detect OS preference
    return this.getOsPreference();
  }

  /**
   * Detect OS preference using prefers-color-scheme
   */
  private getOsPreference(): ThemeMode {
    if (!window.matchMedia) {
      return 'light'; // Fallback if matchMedia not supported
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Listen to OS preference changes and update theme if not explicitly set
   */
  private listenToOsPreference(): void {
    if (!window.matchMedia) {
      return; // Skip if not supported
    }

    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    // Use addEventListener for better browser support
    this.mediaQueryList.addEventListener('change', (e) => {
      // Only update if user hasn't explicitly set a preference (not in localStorage with 'explicit' flag)
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (!saved) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.themeSubject.next(newTheme);
        this.applyTheme(newTheme);
      }
    });
  }

  /**
   * Set theme and persist to localStorage
   */
  public setTheme(theme: ThemeMode): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Reset to OS preference and clear localStorage
   */
  public resetToOsPreference(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    const osTheme = this.getOsPreference();
    this.themeSubject.next(osTheme);
    this.applyTheme(osTheme);
  }

  /**
   * Get current theme (synchronous)
   */
  public getTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  /**
   * Apply theme class to document root
   */
  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;

    // Remove both classes
    root.classList.remove(this.LIGHT_CLASS, this.DARK_CLASS);

    // Add the appropriate class
    root.classList.add(theme === 'dark' ? this.DARK_CLASS : this.LIGHT_CLASS);
  }

  /**
   * Cleanup on service destroy (if needed)
   */
  public ngOnDestroy(): void {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeEventListener('change', () => {});
    }
  }
}
