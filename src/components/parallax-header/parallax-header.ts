import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[parallax-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ParallaxHeader {

  header: any;
  headerHeight: any;
  translateAmt: any;
  scaleAmt: any;
  avatar: any;
  @Input('navBar') navBar: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngOnInit() {


    const content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header = content.getElementsByClassName('header-image')[0];
    const mainContent = content.getElementsByClassName('main-content')[0];

    this.avatar = content.getElementsByClassName('avatar-container')[0];

    this.headerHeight = this.header.clientHeight;

    this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
    this.renderer.setElementStyle(this.header, 'background-size', 'cover');
    this.renderer.setElementStyle(mainContent, 'position', 'absolute');

  }

  onWindowResize(ev) {
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev) {

    ev.domWrite(() => {
      this.updateParallaxHeader(ev);
    });

  }

  updateParallaxHeader(ev) {

    if (ev.scrollTop >= 0) {
      this.translateAmt = ev.scrollTop / 2;
      this.scaleAmt = 1;

    } else {
      this.translateAmt = 0;
      this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
    }

    this.hideShowAvatar();
    this.setNavbarOpacity();

    this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')');

  }

  hideShowAvatar() {


    this.renderer.setElementStyle(this.avatar, 'opacity', (1 - (this.translateAmt / 100)).toString());


  }

  setNavbarOpacity() {

    this.navBar._elementRef.nativeElement.style.opacity = this.translateAmt / 100;
  }

}
