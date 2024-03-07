import { createReadStream, createWriteStream, existsSync } from 'node:fs';

if (existsSync('./package.json')) {
    const readableStream = createReadStream('./package.json');
    const writableStream = createWriteStream('./package2.json');

    readableStream.setEncoding('utf8')
        .on('data', chunk => writableStream.write(chunk))
        .on('end', () => writableStream.end())
        .on('error', error => console.log(error));
}
