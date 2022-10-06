export class Folder {
    name: string
    uid: string
    parent: number

    constructor(uid, name, parent) {
      this.name = name;
      this.uid = uid;
      this.parent = parent;
    }
}
