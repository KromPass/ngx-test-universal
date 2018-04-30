import {Component, ElementRef, Inject, Injector, OnDestroy, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {Language, Quotation, Service} from '../../shared/models/quotation';
import {ActivatedRoute, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit, OnDestroy {
  quotation: Quotation;
  inLoading: boolean;
  supportServices;
  availableTargets;
  player1;
  player2;
  player3;
  isBrowser;
  modalService;
  queryParams;
  otherLanguageOpen; // per gestire apertura e chiusura
  tmpTarget: string;
  @ViewChild('elFormQuotation') elFormQuotation: ElementRef;
  @Output() optionSelected: string[] = []; // array con le opzioni selezionate nel modale

  constructor(@Inject(PLATFORM_ID) private platformId,
              private injector: Injector,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2) {

    this.isBrowser = isPlatformBrowser(platformId);
    this.initQuotation();
    this.optionSelected.push(this.tmpTarget);
    this.otherLanguageOpen = false;
    this.availableTargets = [];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.renderer.removeClass(document.body, 'modal-open');
    }

  }

  pushMultiple(event) {
    this.quotation.targets = [];
    for (let i = 0; i < this.optionSelected.length; ++i) {
      const item = new Language();
      item.name = this.optionSelected[i];
      this.quotation.targets.push(item);
    }
    this.tmpTarget = this.optionSelected.join('-');
  }

  onOtherLanguagesClick() {
    this.otherLanguageOpen = !this.otherLanguageOpen;
    if (this.isBrowser) {
      this.renderer.addClass(document.body, 'modal-open');
    }

  }

  initQuotation() {
    this.queryParams = {};
    this.inLoading = false;
    this.quotation = new Quotation();
    this.quotation.source = new Language();
    this.quotation.source.name = 'Italian';
    this.quotation.targets = [];
    this.quotation.targets.push(new Language());
    this.quotation.targets[0].name = 'English';
    this.tmpTarget = 'English';
    this.quotation.minutes = 5;
  }
}
