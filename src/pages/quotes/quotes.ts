import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams} from "ionic-angular";

import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";


@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})

export class QuotesPage implements OnInit {

  quoteGroup: {
    category: string,
    quotes: Quote[],
    icon: string
  };

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private quotesService: QuotesService) {
  }

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          }
        } ]
    });

    alert.present();
  }


  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote){
    return this.quotesService.isQuoteFavorite(quote);
  }

  // ionViewDidLoad(){
  //   this.quoteGroup = this.navParams.data;
  //
  //   // Note: add (?) in the method to use this approach
  //   // and fetch the data after they has been loaded
  // }
}


