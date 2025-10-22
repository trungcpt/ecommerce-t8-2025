interface Log {
  log(): void;
}

class OtherLogger implements Log {
  log() {
    console.log('>>> log with other logger');
  }
}
class WinstonLogger implements Log {
  log() {
    console.log('>>> log with winston');
  }
}
class Logger implements Log {
  log() {
    console.log('>>> log something');
  }
}

// DI: Dependency Injection
class User {
  private logger: Log;
  constructor(logger: Log) {
    this.logger = logger;
  }

  showLog() {
    this.logger.log();
  }
}

// class User {
//   private logger: Logger;
//   constructor() {
//     this.logger = new Logger();
//   }

//   showLog() {
//     this.logger.log();
//   }
// }

const user = new User(new Logger());
user.showLog();
