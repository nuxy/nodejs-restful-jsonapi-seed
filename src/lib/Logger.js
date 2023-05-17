import config from 'config';
import fs     from 'fs';
import morgan from 'morgan';
import path   from 'path';
import rfs    from 'rotating-file-stream';

/**
 * @export default {Function}
 */
export default (format) => {
  if (config.get('logger.enable')) {

    // Create output directory.
    let outDir = config.get('logger.outputDir');

    if (fs.existsSync(outDir) === false) {
      outDir = path.join(__dirname, '../log');

      fs.mkdirSync(outDir);
    }

    // Create rotating write stream.
    const logStream = rfs(`${format}.log`, {
      interval: config.get('logger.rotateInterval'),
      path: outDir
    });

    return morgan(format, {
      stream: logStream
    });
  } else {
    return morgan(format);
  }
};
