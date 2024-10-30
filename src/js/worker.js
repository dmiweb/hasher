import crypto from "crypto-js";

self.addEventListener("message", (e) => {
  const { file, algorithm } = e.data;

  if (!file) return;

  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    const fileArrayBuffer = e.target.result;

    const wordArray = crypto.lib.WordArray.create(fileArrayBuffer);

    let hash = getHashByAlgorithm(algorithm, wordArray);

    const validHash = validationHash(hash, algorithm);

    if (!validHash) {
      hash = "Ошибка!";
    }

    self.postMessage(hash);
  });

  reader.readAsArrayBuffer(file);
});

function getHashByAlgorithm(algorithm, wordArray) {
  switch (algorithm) {
    case "MD5":
      return crypto.MD5(wordArray).toString(crypto.enc.Hex);
    case "SHA1":
      return crypto.SHA1(wordArray).toString(crypto.enc.Hex);
    case "SHA256":
      return crypto.SHA256(wordArray).toString(crypto.enc.Hex);
    case "SHA512":
      return crypto.SHA512(wordArray).toString(crypto.enc.Hex);
  }
}

function validationHash(hash, algorithm) {
  switch (algorithm) {
    case "MD5": {
      const md5 = /^[a-f0-9]{32}$/gi;
      return md5.test(hash);
    }
    case "SHA1": {
      const sha1 = /\b([a-f0-9]{40})\b/;
      return sha1.test(hash);
    }
    case "SHA256": {
      const sha256 = /^[a-fA-F0-9]{64}$/gm;
      return sha256.test(hash);
    }
    case "SHA512": {
      const sha512 = /^[a-fA-F0-9]{128}$/gm;
      return sha512.test(hash);
    }
  }
}
