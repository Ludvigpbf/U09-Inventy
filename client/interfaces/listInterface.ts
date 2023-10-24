export interface List {
  _id: string;
  listTitle: string;
  listDescription?: string;
  listSections?: string[];
  listItems?: string[];
}
