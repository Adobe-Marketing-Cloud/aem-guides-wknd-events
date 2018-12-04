import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlMatchResult,
         Resolve, ActivatedRouteSnapshot,
         DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { PageComponent} from './components/page/page.component';

export function AemPageMatcher ( url: UrlSegment[] ): UrlMatchResult {
  const path = url.join('/');

  if (path.startsWith('content/wknd-events/angular/')) {
    return ({
      consumed: url,
      posParams: { path: url[url.length - 1]}
    });
  }
}

@Injectable()
export class AemPageDataResolver implements Resolve<string> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    // Returns the absolute resource path with no extension, ex: /content/wknd-events/angular/home/event-1
    return '/' + route.url.join('/').replace(/\.[^/.]+$/, '');
  }
}

export class AemPageRouteReuseStrategy implements RouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
    shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null; }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean { return false; }
}

const routes: Routes = [
 {
    matcher: AemPageMatcher,
    component: PageComponent,
    resolve: {
      path: AemPageDataResolver
    }
  },
  {
    path: '',
    redirectTo: 'content/wknd-events/angular/home.html',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AemPageDataResolver, {
    provide: RouteReuseStrategy,
    useClass: AemPageRouteReuseStrategy
  }]
})
export class AppRoutingModule { }
