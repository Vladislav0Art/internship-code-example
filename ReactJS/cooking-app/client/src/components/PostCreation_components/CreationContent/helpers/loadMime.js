// checking real mime type of an image
const loadMime = (file) => {
  return new Promise((resolve, reject) => {

    //List of known mimes
    const mimes = [{
        mime: 'image/jpeg',
        pattern: [0xFF, 0xD8, 0xFF],
        mask: [0xFF, 0xFF, 0xFF],
      },
      {
        mime: 'image/png',
        pattern: [0x89, 0x50, 0x4E, 0x47],
        mask: [0xFF, 0xFF, 0xFF, 0xFF],
      },
      {
        mime: 'image/webp',
        pattern: [0x52, 0x49, 0x46, 0x46],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {
        mime: 'image/gif',
        pattern: [0x47, 0x49, 0x46, 0x38],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      }
      // you can expand this list see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
    ];

    // comparing mime pattern and bytes 
    function check(bytes, mime) {
      for (let i = 0; i < mime.mask.length; ++i) {
        if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
          return false;
        }
      }
      return true;
    }

    // read the first 4 bytes of the file
    const blob = file.slice(0, 4);

    const reader = new FileReader();


    reader.addEventListener('loadend', (e) => {
      if (e.target.readyState === FileReader.DONE) {
        const bytes = new Uint8Array(e.target.result);

        for (let i = 0; i < mimes.length; ++i) {
          if (check(bytes, mimes[i]))
            resolve(true);
        }

        resolve(false);
      }
    });

    reader.readAsArrayBuffer(blob);

  });
}


export default loadMime;