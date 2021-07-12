import { MainLayoutComponent } from './main-layout.component';
import { Route, Routes } from '@angular/router';

/**
 * Provides helper methods to create routes.
 */
export class MainLayoutService {

  /**
   * Creates routes using the layout component and authentication.
   * @param routes The routes to add.
   * @return The new route using layout as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: MainLayoutComponent,
      children: routes,
    };
  }
}
