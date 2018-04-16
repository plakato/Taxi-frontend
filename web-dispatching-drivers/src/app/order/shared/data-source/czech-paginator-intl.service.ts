import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable()
export class CzechPaginatorIntl extends MatPaginatorIntl {

  itemsPerPageLabel = 'Položek na stránku:';
  nextPageLabel = 'Další stránka';
  previousPageLabel = 'Předchozí stránka';

}
