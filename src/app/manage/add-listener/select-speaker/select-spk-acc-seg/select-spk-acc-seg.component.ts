import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ShareFolderService} from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../../listener-data.service';

@Component({
  selector: 'app-select-spk-acc-seg',
  templateUrl: './select-spk-acc-seg.component.html',
  styleUrls: ['./select-spk-acc-seg.component.scss'],
})
export class SelectSpkAccSegComponent implements OnInit {
  @ViewChild('userLists', {read: ElementRef}) userListsElem: ElementRef

  public filteredSelectedAccents: string[];
  public filteredAllAccents: string[];

  private allAccents: string[];
  private selectedAccents: string[];
  private searchTerm = '';

  constructor(private shareFolderService: ShareFolderService,
              private listenerData: ListenerDataService) {}

  ngOnInit(): void {
    this.fetchAccentLists();
  }

  async fetchAccentLists(): Promise<void> {
    await this.shareFolderService.getAllAccents()
        .toPromise()
        .then((allAccents) => {
          this.allAccents = allAccents;
          this.filteredAllAccents = allAccents;
        });
    const accents = this.listenerData.getAccents();
    this.selectedAccents = accents;
    this.filteredSelectedAccents = accents;
    this.filterAccents();
    this.userListsElem.nativeElement.classList.add('loaded');
  }

  onSearchTerm(event: CustomEvent): void {
    this.searchTerm = event.detail.value;
    this.filterAccents();
  }

  filterAccents(): void {
    const filtered = this.shareFolderService
        .filterAccentLists(
            this.selectedAccents, this.allAccents, this.searchTerm);
    this.filteredSelectedAccents = filtered.filteredAccents;
    this.filteredAllAccents = filtered.filteredAllAccents;
  }

  async addAccent(accent: string): Promise<void> {
    this.selectedAccents.push(accent);
    this.listenerData.setAccents(this.selectedAccents);
    this.filterAccents();
  }

  async removeAccent(accent: string): Promise<void> {
    this.selectedAccents = this.selectedAccents
        .filter((selAcc) => selAcc != accent);
    this.listenerData.setAccents(this.selectedAccents);
    this.filterAccents();
  }

}
