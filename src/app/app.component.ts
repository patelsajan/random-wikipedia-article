import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'random';


  constructor( private http: HttpClient) {
  }

  error = false;

  url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=* ';
  cdata: any;
  contentUrl = 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&formatversion=2&origin=*&format=json&pageid=';
  content: any;


  getRandom(): void {
    this.http.get(this.url).subscribe(data => {
        console.log('random:', data);
        this.cdata = data;
        // this.contentUrl += this.cdata.query.random[0].id;
        console.log('contentUrl:', this.contentUrl);
        this.http.get(this.contentUrl + this.cdata.query.random[0].id).subscribe(content => {
            console.log('content:', content);
            this.content = content;
        }
        , error => { console.log(error);
                     this.error = true;
                     this.content = null; });
    });
  }

}
