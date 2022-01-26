import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RippleService {
  private renderer: Renderer2 | null = null;

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public enableStaticRipple(_element: HTMLElement, _appRippleColor: string | null): void {
    if (this.renderer != null) {
      let staticRippleDiv: HTMLElement = this.renderer.createElement('div');
      staticRippleDiv.classList.add('static-ripple');
      if (_appRippleColor != null && _appRippleColor != '') staticRippleDiv.setAttribute('color', _appRippleColor);
      
      let staticRippleIndicator: HTMLElement | null = <HTMLElement> _element.getElementsByClassName('static-ripple-indicator')[0];
      
      if (staticRippleIndicator != null) {
        _element.addEventListener('mousedown', (_event: any) => {
          staticRippleIndicator?.appendChild(staticRippleDiv);
        });
  
        _element.addEventListener('mouseup', (_event: any) => {
          staticRippleIndicator!.style.animation = 'ripple-fade-out 0.15s ease-in-out';

          setTimeout(() => {
            staticRippleIndicator?.removeChild(staticRippleDiv);
          }, 150);
        });
      }
    }
  }
}
