README

COS 216 PRACTICAL ASSIGNMENT 3

JOSHUA GARNER 22502883

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

How to use the website:

1. A user signs up by entering personal details such as Name, Surname, Email and Password.

2. Once a user is signed up they log in to the website and have access to all the features.

3. When a user is logged in their username will appear where the login option usually appears.

4. The user can then access the Cars page where they can view all the available cars on the website and search for specific ones.

5. The user can access the Brands page where they can view all the available car brands.

6. The user can access the Find Me A Car page where they can find cars based on specific filters.

7. The user can access the Compare page where they can compare cars based on the specifications of each car.

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

Default Login Details:

- Name: Joshua
- Surname: Garner
- Email: joshua33garner33@gmail.com
- Password: Garner123#

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

Password Requirements:

- The password is stored in a hashed format using the password_hash() function, it uses the default hashing algorithm as specified by the constant PASSWORD_DEFAULT. A salt is generated using the random_bytes() function and is concatenated with the hashed password before it is hashed again using the SHA-256 algorithm. The password is also required to be 8 characters long, to contain at least one uppercase letter, at least one digit and one symbol, this is done by making use of JS Regex. These requirements are necessary as they add extra security to the password by making it more difficult to be able to guess it.

- JS Regex used for password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

Choice of Hashing algorithm:

- The choice of hashing algorithm is a secure one, as SHA-256 is widely used and is a very secure hashing algorithm, the use of a salt adds another layer of security and makes it harder for an attacker to crack the password through dictionary attacks or rainbow tables.

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

Generation of API key:

- The generated api keys are also secure, as they are generated using random bytes which ensures that it is unique and not easily guessed or cracked. Storing it in hexadecimal format ensures that it can be easily represented as a string and stored in the database.

______________________________________________________________________________________________________________________________________________________________________________
______________________________________________________________________________________________________________________________________________________________________________

BONUS: Caching Feature:

- It checks if the cached data is still available and it uses the cached data if less than 1 hour has elapsed.
