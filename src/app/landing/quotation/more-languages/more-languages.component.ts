import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, Renderer2} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {filter} from 'rxjs/operator/filter';
import {TagModel} from 'ngx-chips/core/accessor';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-more-languages',
  templateUrl: './more-languages.component.html',
  styleUrls: ['./more-languages.component.scss']
})
export class MoreLanguagesComponent implements OnInit, OnDestroy {

  languages = [
    'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani',
    'Bahamas', 'Bajan', 'Belarusian', 'Bemba', 'Bengali', 'Bislama', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese',
    'Catalan', 'Cebuano', 'Chamorro', 'Chinese', 'Chinese Traditional', 'Classical Greek', 'Croatian', 'Creole', 'Czech',
    'Danish', 'Dutch', 'Dzongkha',
    'English', 'English US', 'Esperanto', 'Estonian',
    'Faroese', 'Finnish', 'Flemish', 'French',
    'Galician', 'Georgian', 'German', 'Swiss German', 'Greek', 'Grenadian Creole English', 'Gujarati', 'Guyanese Creole English',
    'Haitian Creole', 'Hausa', 'Hawaiian', 'Hebrew', 'Hindi', 'Hungarian',
    'Icelandic', 'Indonesian', 'Inuktitut Greenlandic', 'Irish Gaelic', 'Italian',
    'Jamaican Creole', 'Japanese', 'Javanese',
    'Kabuverdianu', 'Kannada', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Kirundi', 'Korean', 'Kurdish', 'Kurdish Sorani', 'Kyrgyz',
    'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish',
    'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maldivian', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Montenegrin', 'Morisyen',
    'Nepali', 'Norwegian', 'Nyanja',
    'Palauan', 'Papiamentu', 'Pashto', 'Persian', 'Polish', 'Portuguese', 'Portuguese Brazil', 'Punjabi', 'Pakistani',
    'Quechua',
    'Romanian', 'Russian',
    'Saint Lucian Creole French', 'Samoan', 'Scots Gaelic', 'Serbian', 'Seselwa Creole French',
    'Shona', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish Latin America',
    'Spanish', 'Spanish US', 'Swahili', 'Swedish',
    'Tajik', 'Tamil', 'Tagalog', 'Telugu', 'Thai', 'Tibetan', 'Tigrinya', 'Tok Pisin', 'Tongan', 'Tswana', 'Turkish', 'Turkmen',
    'Ukrainian', 'Urdu', 'Uzbek',
    'Vietnamese', 'Vincentian Creole English', 'Virgin Islands Creole English',
    'Welsh', 'Xhosa', 'Yoruba ', 'Zulu'
  ];
  @Input() languagesSelected: string[];
  @Input() open: boolean; // modal open
  @Input() source: string; // source language
  @Output() openChange = new EventEmitter<boolean>(); // event emitted on close
  @Output() languagesSelectedChange = new EventEmitter<string[]>(); // event emitted on languages selected change
  @Output() selectionDone = new EventEmitter<boolean>(); // event emitted on confirm selected languages
  isBrowser;
  filtered: string[]; // array that includes matching languages after searchAlgorithm

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.filtered = [];
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  onAddTop5() {
    this.languagesSelected = [];
    this.languagesSelected = [
      'English', 'French', 'Italian', 'German', 'Spanish'
    ];
  }

  onAddTop10() {
    this.languagesSelected = [];
    this.languagesSelected = [
      'English', 'Arabic', 'Italian', 'German', 'Spanish', 'Chinese', 'Japanese', 'Portuguese', 'Dutch', 'French'
    ];
  }

  onAddTop20() {
    this.languagesSelected = [];
    this.languagesSelected = [
      'English', 'Arabic', 'Italian', 'German', 'Spanish', 'Chinese', 'Japanese', 'Portuguese', 'Dutch', 'French',
      'Danish', 'English US', 'Finnish', 'Norwegian', 'Portuguese Brazil', 'Polish', 'Spanish Latin America', 'Russian',
      'Swedish', 'Chinese Traditional'
    ];
  }

  onCloseLanguages() {
    if (this.languagesSelected.length < 1) {
      this.languagesSelected.push('English');
      this.selectionDone.emit(true);
    }
    this.open = !this.open;
    this.openChange.emit(this.open);
    if (this.isBrowser) {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  onConfirmLanguages() {
    if (this.languagesSelected.length < 1) {
      this.languagesSelected = [];
    }
    this.languagesSelectedChange.emit(this.languagesSelected);
    this.selectionDone.emit(true);
    this.onCloseLanguages();
  }

  onResetLanguages() {
    this.languagesSelected = [];
  }

  onAddToSelectedLanguages(language) {
    if (!this.languagesSelected.includes(language)) {
      this.languagesSelected.push(language);
    } else {
      const index = this.languagesSelected.indexOf(language);
      if (index > -1) {
        this.languagesSelected.splice(index, 1);
      }
    }
    console.log(this.languagesSelected);
  }

  public matchingFn(value: string, target: any): boolean {
    const targetValue = target.display.toString();
    return targetValue && targetValue
      .toLowerCase()
      .startsWith(value.toLowerCase()) || false;
  }
}
