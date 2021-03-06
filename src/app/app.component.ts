import { Component, OnInit } from '@angular/core';
import { ItemService } from './item/item.service';

// declare const Word: any;
declare const Office: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showAdministration = false;

  category;

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.addEventHandlerToBinding();
  }

  selectCategory(event) {
    this.category = event.target.selectedOptions[0].value;
    console.log(this.category);

    this.itemService.getAll().subscribe(data => {
      console.log('-----------------------------------------', data);
    });
  }

  selectTemplate(event) {
    console.log(event.target.innerText);
    Office.context.document.setSelectedDataAsync(event.target.innerText, {}, asyncResult => {
      console.log(asyncResult);
    });
  }

  // writeWord() {
  //   Word.run(async (context) => {
  //     // Create a proxy object for the document body.
  //     const body = context.document.body;
  //
  //     // Queue a command to load the text property of the proxy body object.
  //     context.load(body, 'text');
  //
  //     // Queue a command to insert text into the end of the Word document body.
  //     body.insertText('This is text inserted after loading the body.text property',
  //       Word.InsertLocation.end);
  //
  //     // Synchronize the document state by executing the queued commands,
  //     // and return a promise to indicate task completion.
  //     return context.sync().then(function () {
  //       console.log('Body contents: ' + body.text);
  //     });
  //   });
  // }

  private addEventHandlerToBinding() {
    console.log('Initing addEventHandlerToBinding ');
    Office.select('bindings#a').addHandlerAsync(Office.EventType.BindingDataChanged, (eventArgs) => {
      console.log('Data has changed in binding: ' + eventArgs.binding.id);
    });
    // console.document.body.addHandlerAsync(Office.EventType.BindingDataChanged, (eventArgs) => {
    //   console.log('Data has changed in binding: ' + eventArgs.binding.id);
    // });
  }
}
