import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutService } from './layouts/main-layout/main-layout.service';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  MainLayoutService.childRoutes([
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) },
    { path: 'buy', loadChildren: () => import('./pages/buy/buy.module').then(m => m.BuyModule) },
    { path: 'choose', loadChildren: () => import('./pages/choose-nft/choose-nft.module').then(m => m.ChooseNFTModule) },
    { path: 'collection', loadChildren: () => import('./pages/collection/collection.module').then(m => m.CollectionModule) },
    { path: 'collection-var/:id', loadChildren: () => import('./pages/collection-var/collection-var.module').then(m => m.CollectionVarModule) },
    { path: 'create-collection', loadChildren: () => import('./pages/create-collection/create-collection.module').then(m => m.CreateCollectionModule) },
    { path: 'create-item', loadChildren: () => import('./pages/create-item/create-item.module').then(m => m.CreateItemModule) },
    { path: 'create/:id', loadChildren: () => import('./pages/create-nft/create-nft.module').then(m => m.CreateNftModule) },
    { path: 'card/:id', loadChildren: () => import('./pages/nftcard/nftcard.module').then(m => m.NFTCardModule) },
    { path: 'payment-settings1', loadChildren: () => import('./pages/payment-settings1/payment-settings1.module').then(m => m.PaymentSettings1Module) },
    { path: 'payment-settings2', loadChildren: () => import('./pages/payment-settings2/payment-settings2.module').then(m => m.PaymentSettings2Module) },
    { path: 'place-bid', loadChildren: () => import('./pages/place-bid/place-bid.module').then(m => m.PlaceBidModule) },
    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
    { path: 'select-create-collection', loadChildren: () => import('./pages/select-create-collection/select-create-collection.module').then(m => m.SelectCreateCollectionModule) },
    { path: 'select-method', loadChildren: () => import('./pages/select-method/select-method.module').then(m => m.SelectMethodModule) },
    { path: 'sell', loadChildren: () => import('./pages/sell/sell.module').then(m => m.SellModule) },
  ]),
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
