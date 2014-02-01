<?php
/**
 * Encription Class
 * The encryption method is based on a Encription Key.
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
class Crypto{

  /** encrypts a string base don a key **/
  static function encrypt($string,$key){
    $length = strlen($string);
    $encrypted = '';

    for($i = 0; $i<$length; $i++){
      $enc_char = $char = $string[$i];
      if (ctype_alpha($char))
        $enc_char = self::encrypt_char($char,$key);
      elseif (is_numeric($char))
        $enc_char = self::encrypt_num($char,$key);
      else
        $enc_char = self::encrypt_odd($char,$key);
      $encrypted .= $enc_char;
    }

    // reverse
    $encrypted = strrev($encrypted);

    // Validate Length
    if($length < 4) return $encrypted;

    // swap characters
    $encrypted = self::swap_characters($encrypted,array(0,3));

    return $encrypted;
  }

  /** swap character positions **/
  static function swap_characters($string,$positions){
    $length = strlen($string) - 1;
    foreach($positions as $pos){
      $char1 = $string[$pos];
      $char2 = $string[$length - $pos];
      $string[$pos] = $char2;
      $string[$length - $pos] = $char1;
    }
    return $string;
  }

  /** decrypts a string based on a key **/
  static function decrypt($string,$key){

    if($string == "") return;

    $string = self::swap_characters($string,array(0,3));
    $string = strrev($string);
    $length = strlen($key);
    $length_str = strlen($string);

    $decrypted = '';
    $i = 0;

    // decrypt based on the first key
    while($i<$length_str){
      $enc_char = $char = $string[$i];

      // map character
      if(ctype_alpha($char)){
        $enc_char = chr(ord($enc_char) - (int) $key[0]);
        $enc_char = self::decrypt_char($enc_char);
      }
      if(is_numeric($char))
        $enc_char = self::decrypt_num($enc_char, (int) $key[0]);

      $decrypted .= $enc_char;
      $i = $i + $length;
    }

    return $decrypted;
  }

  /** decrypts an alphabetic character **/
  static function decrypt_char($char){
    $translate = array(
      // Mayus
      ':' => 'T',     ';' => 'U',   '<' => 'V',   '=' => 'W',
      '>' => 'X',     '?' => 'Y',   '@' => 'Z',
      // Minus
      '[' => 'u',     '\\' => 'v', ']' => 'w',   '^' => 'x',
      '_' => 'y',     '`' => 'z'
    );
    if (@$translate[$char]) return $translate[$char];
    return $char;
  }

  /** decrypts a number **/
  static function decrypt_num($num,$key){
    if($num-$key < 0) return $num - $key +10;
    return $num-$key;
  }

  /** encrypts a non alpha and non numeric char **/
  static function encrypt_odd($odd,$key){
    $length = strlen($key);
    $encrypt = '';
    for($i = 0; $i < $length; $i++) $encrypt .= $odd;
    return $encrypt;
  }

  /** encrypts a number **/
  static function encrypt_num($num,$key){
    $length = strlen($key);
    $encrypt = '';
    for($i = 0; $i < $length; $i++){
      $enc_num = $num + $key[$i];
      if($enc_num >= 10){
        $enc_num = (string) $enc_num;
        $enc_num = $enc_num[1];
      }
      $encrypt .= $enc_num;
    }
    return $encrypt;
  }

  /** encrypts an alphabet character **/
  static function encrypt_char($char,$key){
    $length = strlen($key);
    $encrypted = '';

    for($i = 0; $i<$length; $i++){
      // set letter
      $enc_char = $char;

      if (ctype_alpha($enc_char)){
        for($j = 0; $j<$key[$i]; $j++) ++$enc_char;
        $enc_char = (strlen($enc_char)>1)? $enc_char[1]: $enc_char;
      }

      $encrypted .= $enc_char;
    }
    return $encrypted;
  }
}
?>
