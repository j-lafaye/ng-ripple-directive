export class RippleModel {
  private x: number = 0;
  private y: number = 0;
  private diameter: number = 0;

  constructor(
    _x: number,
    _y: number,
    _diameter: number
  ) {
    this.x = _x;
    this.y = _y;
    this.diameter = _diameter;
  }

  get _x(): number {
    return this.x;
  }

  set _x(value: number) {
    this.x = value;
  }

  get _y(): number {
    return this.y;
  }

  set _y(value: number) {
    this.y = value;
  }

  get _diameter(): number {
    return this.diameter;
  }

  set _diameter(value: number) {
    this.diameter = value;
  }
}

import { Directive, ElementRef, HostListener, Input, Renderer2, RendererFactory2 } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {
  private renderer: Renderer2 | null = null;
  @Input() appRippleColor: string = '';

  constructor(
    private elementRef: ElementRef,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(this.elementRef.nativeElement, null);
  }

  @HostListener('click', ['$event']) onClick(_event: any) {
    let elementPosition: string = this.elementRef.nativeElement.style.getPropertyValue('position');
    let elementDOMRect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
    let ripple = new RippleModel(
      _event.clientX - elementDOMRect.left,
      _event.clientY - elementDOMRect.top,
      Math.min(this.elementRef.nativeElement.offsetHeight, this.elementRef.nativeElement.offsetWidth, 100)
    );

    if (this.renderer != null) {
      let rippleDiv: HTMLElement = this.renderer.createElement('div');
      rippleDiv.classList.add('ripple');
      if (this.appRippleColor != null && this.appRippleColor != '') rippleDiv.setAttribute('color', this.appRippleColor);

      let rippleWaveDiv: HTMLElement = this.renderer.createElement('div');
      rippleWaveDiv = this.renderer.createElement('div');
      rippleWaveDiv.classList.add('ripple-wave');
      rippleWaveDiv.style.width = ripple._diameter + 'px';
      rippleWaveDiv.style.height = ripple._diameter + 'px';
      rippleWaveDiv.style.left = ripple._x - (ripple._diameter / 2) + 'px';
      rippleWaveDiv.style.top = ripple._y - (ripple._diameter / 2) + 'px';
      rippleWaveDiv.onanimationend = function() { rippleDiv.remove() };
      rippleDiv.appendChild(rippleWaveDiv);

      if (!elementPosition || elementPosition === 'static') this.elementRef.nativeElement.style.position = 'relative';
        
      this.elementRef.nativeElement.appendChild(rippleDiv);
    }
  }
}
