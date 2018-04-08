'use strict';

import memoryStore from 'memorystore';

/**
 * Example of a session store wrapper.
 *
 * @see https://www.npmjs.com/package/express-session#compatible-session-stores
 *
 * @class
 */
class SessionStore {

  /**
   * Create a new instance of SessionStore.
   *
   * @param {Function} session
   *   Express session function.
   *
   * @return {MemoryStore}
   *   MemoryStore instance.
   */
  constructor(session) {
    if (typeof session.Store !== 'function') {
      throw new Error('Constructor argument must be session.Store function');
    }

    return new (memoryStore(session))({
      checkPeriod: 86400000
    });
  }
};

/**
 * @export default SessionStore
 */
export default SessionStore;
