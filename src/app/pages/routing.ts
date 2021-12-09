import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { AddTableComponent } from './tables/add-table/add-table.component';
import { TablesComponent } from './tables/tables.component';
import { Routes } from '@angular/router';
import { components } from '../_metronic/kt';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'tables',
    component: TablesComponent
  },
  {
    path: 'tables/add',
    component: AddTableComponent
  },
  {
    path: "products",
    component: ProductComponent
  },
  {
    path: "products/add",
    component: AddProductComponent
  }
];

export { Routing };
