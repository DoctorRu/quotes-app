import {Component} from '@angular/core';
import {ModalController} from "ionic-angular";

import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService: QuotesService,
              private modalCtrl: ModalController,
              private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      // Use onDidDismiss if you wanna to take some data back from modal.
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    })
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    // this.quotesService.removeQuoteFromFavorites(quote);
    // this.quotes = this.quotesService.getFavoriteQuotes();

    // or ->
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      // Essa fuunçao é executada para cada elemento da array,
      // funciona como um .each {|e|...},
      // verifica se o id de cada um dos elementos é igual o id do elemento selecionado
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

  isAltBackground(){
    return this.settingsService.isAltBackground();
  }

}
