'use strict';

import config from 'config';
import fs     from 'fs';

/**
 * Provides SSL (Secure Socket Layer) options.
 */
class SSL {

  /**
   * Return the CA bundle as string.
   *
   * @return {String|undefined}
   *
   * @example
   *   const ca = SSL.ca();
   */
  static ca() {
    const ca = config.get('server.http.ssl.config.ca');

    return fs.existsSync(ca) && fs.readFileSync(ca) || ca;
  }

  /**
   * Return the certificate as string.
   *
   * @return {String|undefined}
   *
   * @example
   *   const cert = SSL.cert();
   */
  static cert() {
    const cert = config.get('server.http.ssl.config.cert');

    return fs.existsSync(cert) && fs.readFileSync(cert) || cert;
  }

  /**
   * Return the private key as string.
   *
   * @return {String|undefined}
   *
   * @example
   *   const key = SSL.key();
   */
  static key() {
    const key = config.get('server.http.ssl.config.key');

    return fs.existsSync(key) && fs.readFileSync(key) || key;
  }
}

/**
 * @export default SSL
 */
export default SSL;
