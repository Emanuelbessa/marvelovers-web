export interface ComicDto {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: null | string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: DiamondCode;
  ean: string;
  issn: string;
  format: Format;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: URL[];
  series: Series;
  variants: Series[];
  collections: any[];
  collectedIssues: Series[];
  dates: DateElement[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Characters;
  favorited: boolean;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: CreatorsItem[];
  returned: number;
}

export interface CreatorsItem {
  resourceURI: string;
  name: string;
  role: Role;
}

export enum Role {
  Colorist = 'colorist',
  Editor = 'editor',
  Inker = 'inker',
  Letterer = 'letterer',
  Penciler = 'penciler',
  Penciller = 'penciller',
  PencillerCover = 'penciller (cover)',
  Writer = 'writer',
}

export interface DateElement {
  type: DateType;
  date: string;
}

export enum DateType {
  FocDate = 'focDate',
  OnsaleDate = 'onsaleDate',
}

export enum DiamondCode {
  Empty = '',
  Jul190068 = 'JUL190068',
}

export enum Format {
  Comic = 'Comic',
  Digest = 'Digest',
  Empty = '',
  TradePaperback = 'Trade Paperback',
}

export interface Thumbnail {
  path: string;
  extension: Extension;
}

export enum Extension {
  Jpg = 'jpg',
}

export interface Price {
  type: PriceType;
  price: number;
}

export enum PriceType {
  PrintPrice = 'printPrice',
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
}

export enum ItemType {
  Cover = 'cover',
  InteriorStory = 'interiorStory',
  Promo = 'promo',
}

export interface TextObject {
  type: TextObjectType;
  language: Language;
  text: string;
}

export enum Language {
  EnUs = 'en-us',
}

export enum TextObjectType {
  IssueSolicitText = 'issue_solicit_text',
}

export interface URL {
  type: URLType;
  url: string;
}

export enum URLType {
  Detail = 'detail',
  Purchase = 'purchase',
}

export interface ComicFavs {
  cod_marvelid_com: number;
  des_name_com: string;
  des_thumbnail_com: string;
  des_description_com: string;
  favorited?: boolean;
}