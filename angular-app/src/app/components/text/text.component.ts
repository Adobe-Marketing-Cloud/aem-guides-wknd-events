import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MapTo} from '@adobe/cq-angular-editable-components';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() richText: boolean;
  @Input() text: string;

  constructor(private sanitizer: DomSanitizer) {}

  get content() {
    const textValue = this.text || '';

    if (this.richText) {
      return this.sanitizer.bypassSecurityTrustHtml(textValue);
    } else {
      return textValue;
    }
  }

  ngOnInit() {}
}

const TextEditConfig = {
  emptyLabel: 'Text',

  isEmpty: function(componentData) {
    return !componentData || !componentData.text || componentData.text.trim().length < 1;
  }
};

MapTo('wknd-events/components/content/text')(TextComponent, TextEditConfig);
