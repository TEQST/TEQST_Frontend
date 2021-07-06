import {Directive, ElementRef, EventEmitter,
  HostListener, Output} from '@angular/core';


@Directive({

  selector: '[clickOutside]',

})

export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target'])

  public onClick(targetElement) {
    // a click on an element with the same id as the 'inside' element
    // also counts as a click inside
    const elementId = this._elementRef.nativeElement.id;
    if (targetElement.id === elementId || targetElement.parentElement.id === elementId) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement
        .contains(targetElement);

    if (!clickedInside) {
      console.log('clicked outside');
      this.clickOutside.emit(null);
    }
  }
}

