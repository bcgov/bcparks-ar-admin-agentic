import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-historical-pill',
    templateUrl: './historical-pill.component.html',
    styleUrls: ['./historical-pill.component.scss'],
    standalone: false
})
export class HistoricalPillComponent {
  @Input() matches: any;
  @Input() query: any;
  @Input() typeaheadTemplateMethods: any;

  // Custom typeahead formatter so that we can put 'historical' badges on subareas.
  getHighlightedMatch(item, query) {
    query = query.join(' ');
    let display = item.value;
    let result = {
      left: '',
      highlight: '',
      right: '',
    }

    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length);
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return {
        left: left_str,
        highlight: highlight_str,
        right: right_str
      };
    } else {
      result.left = display
    }

    return result;
  }
}
