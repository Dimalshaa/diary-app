// export class Events {
//   public title: string;
//   public content: string;
//
//   constructor(title: string, content: string) {
//     this.title = title;
//     this.content = content;
//   }
//
// }
export interface Events {
  _id?: string;
  title: string;
  content: string;
  favorite: boolean;
}
