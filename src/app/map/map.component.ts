import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import MapView from "@arcgis/core/views/MapView.js";

import WebMap from '@arcgis/core/WebMap';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
  public view: any = null;
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });

    const view = new MapView({
      container,
      map: webmap
    });

    const bookmarks = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    });

    const bkExpand = new Expand({
      view,
      content: bookmarks,
      expanded: true,
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(bkExpand, 'top-right');

    // Create a BasemapGallery widget instance and set
    // its container to a div element
    const basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div")
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget
    // Use an Esri icon font to represent the content inside
    // of the Expand widget
    const bgExpand = new Expand({
      view: view,
      content: basemapGallery
    });

    // close the expand whenever a basemap is selected
    basemapGallery.watch("activeBasemap", () => {
      const mobileSize =
        view.heightBreakpoint === "xsmall" ||
        view.widthBreakpoint === "xsmall";

      if (mobileSize) {
        bgExpand.collapse();
      }
    });

    // Add the expand instance to the ui
    view.ui.add(bgExpand, "top-right");

    // bonus - how many bookmarks in the webmap?
    webmap.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });

    this.view = view;
    return this.view.when();
  }

  ngOnInit(): any {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
        console.log('The map is ready.');
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
  
}
