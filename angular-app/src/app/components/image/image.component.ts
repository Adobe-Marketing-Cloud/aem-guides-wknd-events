import {Component, Input, OnInit} from '@angular/core';
import {MapTo} from '@adobe/cq-angular-editable-components';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() src: string;
  @Input() link: string;
  @Input() alt: string;
  @Input() title: string;
  @Input() displayPopupTitle: string;

  constructor() { }

  get hasImage() {
    return this.src && this.src.trim().length > 0;
  }

  get imageTitle() {
    return this.displayPopupTitle ? this.title : '';
  }

  get imageCaption() {
    return this.title;
  }

  ngOnInit() { }
}

const ImageEditConfig = {
  emptyLabel: 'Image',

  isEmpty: function(componentData) {
    return !componentData || !componentData.src || componentData.src.trim().length < 1;
  }
};

MapTo('wknd-events/components/content/image')(ImageComponent, ImageEditConfig);
