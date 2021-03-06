// keys e timestamp para utilizar API Marvel
const timeStamp = '1637284124589';
const publicKey = 'e3dc095cac89cce6b9452a71b2056470';
const privateKey = '5185e55945cfab853d17f9b520556657d518b195';

// função para criar o hash
function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

}

// função para fazer o request da pesquisa
function pesquisaComic(name, limit, offset) {

    // variaveis para controlar o request
    const comicName = name;
    const timeStamp = Date.now().toString();
    const formato = 'comic';
    const order = '-focDate';
    let limite = limit;
    let pulo = offset;
    const hash = createHash(timeStamp);
    let urlAPI = '';

    // verificando que tipo de pesquisa, com ou sem titulo
    if (comicName === '') {
        urlAPI = "http://gateway.marvel.com/v1/public/comics?limit=" + limite + "&offset=" + pulo + "&format=" + formato + "&orderBy=" + order + "&ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + hash;
    } else {
        urlAPI = "http://gateway.marvel.com/v1/public/comics?limit=" + limite + "&titleStartsWith=" + comicName + "&offset=" + pulo + "&format=" + formato + "&orderBy=" + order + "&ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + hash;
    }

    // tratando o quest para que seja possivel utilizar o json
    fetch(urlAPI).then((response) => {
        return response.json();
    }).then((jsonParsed) => {
        getComics(jsonParsed);
    })
}

// função responsavel pelo request das informações das comics
function infoComic(codigo) {

    const comicCod = codigo;
    const timeStamp = Date.now().toString();
    const hash = createHash(timeStamp);
    let urlAPI = '';

    urlAPI = "https://gateway.marvel.com:443/v1/public/comics/" + comicCod + "?limit=20&ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + hash;

    fetch(urlAPI).then((response) => {
        return response.json();
    }).then((jsonParsed) => {
        getInfoComics(jsonParsed);
    })
}

