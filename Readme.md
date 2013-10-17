# Encription Class

Cyrpto encrypts based on a **Encryption Key**, that is a set
of number betwen **0-9**.

E.g

'12' VALID!
'123sdd0' INVALID!

The encryption method consist in three steps:

1. First Step: depends on the type of character.

Each letter of the string will be encrypted based on each
number of the Encryption Key.

a. if the character is Alphabetic thus a-zA-Z
   the encryption will be the next X letters in the alphabetic.
   where X comes from Encryption Key.
   E.g 'hoLA' encrypted by '1' is 'ipMB'
       'hoLA' encrypted by '12' is 'ijpqMNBC

   in we pass the alphabet limit then loop in the alphabet
   E.g 'xYz' encrypted by '3' is 'aBc'
       '
b. if the character is a number 0-9 then the encryption
   will be the Numer + X.
   E.g '0123' encrypted by '1' is '1234'
       '0123' encrypted by '12' is '12233445'

   if we pass the 0-9 limit then we loop
   E.g '89' encrypted by '2' is '01'

c. if the character is non numeric and non alphabetic
   then no operation is apply rather than duplicate the value.
   E.g '_$#' encrypted by '1' is '_$#' (the same)
       '_$#' encrypted by '15' is '__$$##' (the same)

2. Second Step: reverse the string. E.g 'ipLA' => 'ALpi'

3. Third Step: swap letters.
 a. Swap First and Last Letter. E.g 'hola' => 'aolh'
 b. Swap (First + 3) by (Last -3) E.g 'abcDEfgh' => 'abceEDfgh'

Tests

ENCRYPTION CODE: '152'
'123456'       => '217306695584477368'
'hello_world'  => 'iiefqmtwsqtpybx___qtpnqmnqmgjnjmf'
'hola&chao12'  => 'i73p62qtpcfbjmiehd&&&cfbnqmqt3jm4'

ENCRYPTION CODE: '523'
'123456'       => '681770769658548439'
'hello_world'  => 'mfijnqutwrqtzyb___rqtonqonqhgokjg'
'hola&chao12'  => 'm47t36rqtdcfkjmfeh&&&dcfonqrq4kj5'
'lalala'       => 'qcffnqdcfonqdcoond'

