const fs = require('fs');
const { Transform } = require('stream');
// const fsPromises = require('fs/promises');

const ACCESS_LOG = './access.log';

// const data = fs.readFileSync(ACCESS_LOG, 'utf-8');
// try {
//     const data = fs.readFileSync(ACCESS_LOG, {
//         encoding: 'utf-8',
//     });
//     //console.log(data.toString());
//     console.log(data);
// } catch (e) {
//     console.log(e);
// }

// fs.readFile(ACCESS_LOG, {
//     encoding: 'utf-8',
// }, (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// fsPromises.readFile(ACCESS_LOG, 'utf-8')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const requests = [
    `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
    `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

// fs.writeFile(
//     ACCESS_LOG,
//     requests[0] + '\n',
//     {
//         encoding: 'utf-8',
//         flag: 'a',
//     },
//     (err) => {
//         if (err) console.log(err);
//     }
// );

// fs.appendFile(
//     ACCESS_LOG,
//     requests[1] + '\n',
//     'utf-8',
//     console.log
// );

// fs.ReadStream();
// fs.createReadStream();

// const readStream = fs.createReadStream(
//     ACCESS_LOG,
//     {
//       flags: 'r',
//       encoding: 'utf-8',
//       // autoClose: true
//       // start
//       // end
//       highWaterMark: 64,
//     },
// );
//
// readStream.on('data', chunk => {
//     console.log('chunk:', chunk);
// });
// readStream.on('error', err => console.log(err));

// const writeStream = fs.createWriteStream(
//     ACCESS_LOG,
//     {
//         encoding: 'utf-8',
//         flags: 'a',
//     }
// );
//
// requests.forEach(logString => {
//     writeStream.write(logString + '\n');
// });

const payedAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);
const tStream = new Transform({
    transform(chunk, encoding, callback) {
        if (!payedAccount) {
            const tranformed = chunk.toString().replace(/\d+.\d+.\d+.\d+/g, '[IP was hidden]');
            this.push(tranformed);
        } else this.push(chunk);

        callback();
    }
});

readStream.pipe(tStream).pipe(process.stdout);
