class User {
  private static instance: User;

  private constructor() {}

  static getInstance() {
    if (this.instance) return this.instance;
    console.log('>>> new instance');
    const instance = new User();
    this.instance = instance;
    return instance;
  }
}

const user = User.getInstance();
const user2 = User.getInstance();
const user3 = User.getInstance();

// class User {
//   constructor() {
//     console.log('>>> new INSTANCE');
//   }
// }
// const user = new User();
// const user2 = new User();
// const user3 = new User();
