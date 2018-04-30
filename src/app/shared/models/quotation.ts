export class Quotation {
  id ?: number;
  source: Language;
  targets: Language[];
  minutes: number;
  hts_pj_id?: string;
  services?: Service[];
  delivery_date?: any;
  total_price?: number;
  created_at?: any;
}

export class Service {
  id: string;
  name?: string;
  algorithm?: string;
  price?: string;
  min_time?: number;
  delivery_date?: string;
  total_delivery_days?: number;
  total_price?: string;
  selected?: boolean;
  available_source?: boolean;
  available_targets?: Language[];
  unavailable_targets?: Language[];
  jobs?: Job[];
}

export class Job {
  id?: number;
  delivery_date?: string;
  language_pair?: LanguagePair;
  price?: number;
  total_delivery_days?: number;
  total_price?: number;
}

export class LanguagePair {
  id?: number;
  source?: Language;
  target?: Language;
}

export class Language {
  id: number;
  code?: string;
  name?: string;
}
