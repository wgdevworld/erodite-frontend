export const logInfo = (...messages: any[]) => {
  if (__DEV__) {
    let message = '';
    if (messages.every((m) => typeof m !== 'object')) {
      messages.forEach((m) => (message += ' ' + m));
      console.log('ℹ️', message);
    } else {
      messages.forEach((o) => {
        if (typeof o === 'object') {
          console.log(o);
        } else {
          console.log('ℹ️', o);
        }
      });
    }
  }
};

export const logError = (...messages: any[]) => {
  if (__DEV__) {
    let message = '';
    if (messages.every((m) => typeof m !== 'object')) {
      messages.forEach((m) => (message += ' ' + m));
      console.log('🚨 ', message);
    } else {
      messages.forEach((o) => {
        if (typeof o === 'object') {
          console.log(o);
        } else {
          console.log('🚨 ', o);
        }
      });
    }
  }
};
