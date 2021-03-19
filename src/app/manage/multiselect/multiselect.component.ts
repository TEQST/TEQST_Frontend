import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent implements OnInit {

  @Input() texts;
  @ViewChild("toolbar", { read: ElementRef, static: true }) toolbar: ElementRef
  @ViewChildren('checkboxes', {read: ElementRef}) checkboxes: QueryList<ElementRef>
  constructor(private animationCtrl: AnimationController) {
    
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.expandToolbar();
    this.expandCheckbox()
  }

  private expandToolbar(): void {
    const animation = this.animationCtrl.create()
      .addElement(this.toolbar.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('maxHeight', '0', '60px')
      .fromTo('opacity', 0, 1)

    animation.play()
  }

  private expandCheckbox(): void {
    const animation = this.animationCtrl.create()
      .addElement(this.checkboxes.map(checkbox => {
        return checkbox.nativeElement
      }))
      .duration(700)
      .easing('ease')
      .fromTo('maxWidth', '0', '30px')
      .fromTo('opacity', 0, 1)

    animation.play()
  }
  
  


}
