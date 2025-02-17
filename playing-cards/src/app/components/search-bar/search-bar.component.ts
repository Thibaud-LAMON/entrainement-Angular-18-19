import {
  Component,
  EventEmitter,
  input,
  Input,
  model,
  output,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  search = model<string>('initial'); //contient le contenu par défaut de la barre de recherche
  // inutile grâce à model () : searchChange = model<string>(); //contient le contenu de la barre de recherche

  searchButtonClicked = output({ alias: 'submit' });

  searchClick() {
    this.searchButtonClicked.emit();
  }
}
