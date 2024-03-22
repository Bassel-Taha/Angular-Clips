import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[app-event-blocker]',
  standalone: true
})
export class EventBlockerDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public HandleEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

}
