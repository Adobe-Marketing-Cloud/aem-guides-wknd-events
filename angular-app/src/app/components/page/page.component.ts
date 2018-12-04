import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  path;
  items;
  itemsOrder;

  constructor(private route: ActivatedRoute) {
    // Get the data set by the AemPageDataResolver in the Router
    const path = route.snapshot.data.path;

    // Get the JSON data for the ActivatedRoute's path from ModelManager.
    // If the data exists in the JSON retrieved from ModelManager.initialize() that data will be used.
    // else ModelManager handles retrieving the data from AEM.
    ModelManager.getData(path).then((data) => {
      // Get the data well need to populate the template (which includes an Angular AemPageComponent

      // These 3 values, pulled from the JSON are stored as class variables allowing them to be exposed to
      this.path = data[Constants.PATH_PROP];
      this.items = data[Constants.ITEMS_PROP];
      this.itemsOrder = data[Constants.ITEMS_ORDER_PROP];

      window.scrollTo(0, 0);
    });
  }

  ngOnInit() { }
}
