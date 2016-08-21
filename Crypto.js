
// Set Globals
var Alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
var Encryption_Key = ""; // TODO: get this from config

// Load Crypto
function init_Crypto(EKEY){

    Encryption_Key = EKEY; // TODO: get this from config
}


/**
 * @method get_EncryptedString()
 *
 * Encription Function
 * Based on a Encription Key.
 * The Encryption Key is a set of number betwen 0-6.
 * E.g  '12' VALID!
 *      '123sdd0' INVALID!
 *
 * The encryption method consist in three steps:
 *
 * 1. First Step: depends on the type of character.
 *
 * Each letter of the string will be encrypted based on each
 * number of the Encryption Key.
 *
 * a. if the character is Alphabetic thus a-zA-Z
 *    the encryption will be the next X letters in the alphabetic.
 *    where X comes from Encryption Key.
 *    E.g 'hoLA' encrypted by '1' is 'ipMB'
 *        'hoLA' encrypted by '12' is 'ijpqMNBC
 *
 *    in we pass the alphabet limit then loop in the alphabet
 *    E.g 'xYz' encrypted by '3' is 'aBc'
 *        '
 * b. if the character is a number 0-9 then the encryption
 *    will be the Numer + X.
 *    E.g '0123' encrypted by '1' is '1234'
 *        '0123' encrypted by '12' is '12233445'
 *
 *    if we pass the 0-9 limit then we loop
 *    E.g '89' encrypted by '2' is '01'
 *
 * c. if the character is non numeric and non alphabetic
 *    then no operation is apply rather than duplicate the value.
 *    E.g '_$#' encrypted by '1' is '_$#' (the same)
 *        '_$#' encrypted by '15' is '__$$##' (the same)
 *
 * 2. Second Step: reverse the string. E.g 'ipLA' => 'ALpi'
 *
 * 3. Third Step: swap letters.
 *  a. Swap First and Last Letter. E.g 'hola' => 'aolh'
 *  b. Swap (First + 3) by (Last -3) E.g 'abcDEfgh' => 'abceEDfgh'
 *
 * Tests
 *
 * ENCRYPTION CODE: '152'
 * '123456'       => '217306695584477368'
 * 'hello_world'  => 'iiefqmtwsqtpybx___qtpnqmnqmgjnjmf'
 * 'hola&chao12'  => 'i73p62qtpcfbjmiehd&&&cfbnqmqt3jm4'
 *
 * ENCRYPTION CODE: '523'
 * '123456'       => '681770769658548439'
 * 'hello_world'  => 'mfijnqutwrqtzyb___rqtonqonqhgokjg'
 * 'hola&chao12'  => 'm47t36rqtdcfkjmfeh&&&dcfonqrq4kj5'
 * 'lalala'       => 'qcffnqdcfonqdcoond'
 *
 **/
function getEncryptedString(string){

    // encode each character
    var encrypted = "";
    for(var i = 0; i < string.length; i++){
        var chr = string.charAt(i);
        encrypted = encrypted.concat(getEncryptedChar(chr));
    };

    // reverse string
    encrypted = encrypted.split("").reverse().join("");

    // swap letters TODO: make function of this
    encrypted = swapLetters(encrypted,new Array(3,3));
    encrypted = swapLetters(encrypted,new Array(0,0));

    return encrypted;
};

/** swap letter sin a string based on position **/
function swapLetters(string,positions){
    var stringList = string.split("");

    var oldchar = stringList[positions[0]];
    var newchar = stringList[string.length - 1 - positions[1]];

    stringList[positions[0]] = newchar;
    stringList[string.length - 1 - positions[1]] = oldchar;

    return stringList.join("");
}

/** encrypts a sling character **/
function getEncryptedChar(chr){
    
    if (isAlphabet(chr)){ return getEncryptedLetter(chr);
    }else if(isNumeric(chr)){ return getEncryptedNumber(chr);}

    // is non alphanumeric then just repeat
    var string = ''
    for(var i = 0; i < Encryption_Key.length; i++){
        string = string.concat(chr);
    }
    return string;
}

/** encrypts a letter **/
function getEncryptedLetter(letter){
    var string = '';
    var isUpper = (letter == letter.toUpperCase());

    for(var i = 0; i < Encryption_Key.length; i++){
        var offset = parseInt(Encryption_Key.charAt(i));
        var letterPos = getAlphabetPosition(letter);
        var encryptedPos = letterPos + offset;
        if(encryptedPos > 25){ encryptedPos = encryptedPos - 26; }
        string = string.concat(Alphabet[encryptedPos]);
    }

    if(isUpper) return string.toUpperCase();
    return string;
}

/** gets position in alphabet **/
function getAlphabetPosition(letter){
    for( i = 0; i < Alphabet.length; i++){
        if (letter.toLowerCase() == Alphabet[i]){ return i;}
    }
    return 0;
}

/** encrypts a number **/
function getEncryptedNumber(num){
    var string  = '';
    for(var i = 0; i < Encryption_Key.length; i++){
        var offset = Encryption_Key.charAt(i);
        var encrypted = String(parseInt(num) + parseInt(offset));

        // if over 10 get nominal part
        if (parseInt(encrypted) > 9){
            encrypted = encrypted.charAt(1);
        }
        string = string.concat(encrypted);
    }
    return string;
}

/** validates character ir alphabet **/
function isAlphabet(letter){return /^[a-zA-Z]$/.test(letter);}

/** validates numeric character **/
function isNumeric(num){return /^[0-9]$/.test(num);}
