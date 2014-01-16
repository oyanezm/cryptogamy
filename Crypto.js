
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
function get_EncryptedString(string){

    // encode each character
    encrypted = "";
    for(var i = 0; i < string.length; i++){
        chr = string.charAt(i);
        encrypted = encrypted.concat(get_EncryptedChar(chr));
    };

    // reverse string
    encrypted = encrypted.split("").reverse().join("");

    // swap letters TODO: make function of this
    encrypted = swap_letters(encrypted,new Array(3,3));
    encrypted = swap_letters(encrypted,new Array(0,0));

    return encrypted;
};

/** swap letter sin a string based on position **/
function swap_letters(string,positions){
    string_list = string.split("");

    oldchar = string_list[positions[0]];
    newchar = string_list[string.length - 1 - positions[1]];

    string_list[positions[0]] = newchar;
    string_list[string.length - 1 - positions[1]] = oldchar;

    return string_list.join("");
}

/** encrypts a sling character **/
function get_EncryptedChar(chr){
    if (is_Alphabet(chr)){ return get_EncryptedLetter(chr);
    }else if(is_Numeric(chr)){ return get_EncryptedNumber(chr);}

    // is non alphanumeric then just repeat
    string = ''
    for(var i = 0; i < Encryption_Key.length; i++){
        string = string.concat(chr);
    }
    return string;
}

/** encrypts a letter **/
function get_EncryptedLetter(letter){
    string = '';
    is_Upper = (letter == letter.toUpperCase());

    for(var i = 0; i < Encryption_Key.length; i++){
        offset = parseInt(Encryption_Key.charAt(i));
        letter_pos = get_AlphabetPosition(letter);
        encrypted_pos = letter_pos + offset;
        if(encrypted_pos > 25){ encrypted_pos = encrypted_pos - 26; }
        string = string.concat(Alphabet[encrypted_pos]);
    }

    if(is_Upper) return string.toUpperCase();
    return string;
}

/** gets position in alphabet **/
function get_AlphabetPosition(letter){
    for( i = 0; i < Alphabet.length; i++){
        if (letter.toLowerCase() == Alphabet[i]){ return i;}
    }
    return 0;
}

/** encrypts a number **/
function get_EncryptedNumber(num){
    string  = '';
    for(var i = 0; i < Encryption_Key.length; i++){
        offset = Encryption_Key.charAt(i);
        encrypted = String(parseInt(num) + parseInt(offset));

        // if over 10 get nominal part
        if (parseInt(encrypted) > 9){
            encrypted = encrypted.charAt(1);
        }
        string = string.concat(encrypted);
    }
    return string;
}

/** validates character ir alphabet **/
function is_Alphabet(letter){return /^[a-zA-Z]$/.test(letter);}

/** validates numeric character **/
function is_Numeric(num){return /^[0-9]$/.test(num);}
