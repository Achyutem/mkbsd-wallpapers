import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const walls = async () => {
  const url = "https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s";
 
  try {
    const response = await fetch(url);
    const data = (await response.json())['data'];
    let links = []
    for (const key in data){
      const item = data[key]

      for (const wall in item) {
        if(typeof item[wall] === 'string' && item[wall].startsWith('https')) {
          links.push(item[wall])
        };
      }
    }
    const wallsPath = path.join(process.cwd(), 'walls');
    await fs.mkdir(wallsPath, {recursive : true});

    // for (let i=0;i<YOUR DESIRED NUMBER;i++){
    for (let i=0;i<links.length;i++){
      const fileUrl = links[i]
      const fileName = path.basename(fileUrl.split('?')[0])
      const savePath = path.join(wallsPath, fileName)
      console.log(fileName)

      const res = await fetch(fileUrl);
      const buffer = await res.buffer();
      await fs.writeFile(savePath, buffer)
    }

    console.log('All walls downloaded');
  } catch (error) {
    console.error('Error:', error);
  }
};

walls();