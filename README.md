# Agave
Test for AgaveLab

## For the first run
1.- 'npm install' </br>
2.- Set up database</br>
3.- 'npm run'</br>

### Database set up
In the 'src/database/database.js' file configure the database credentials as indicated in the following documentation

https://sequelize.org/docs/v6/getting-started/
![image](https://user-images.githubusercontent.com/60888390/205383805-ada9f3bb-9fbc-4b67-8c68-13d2e5cd9b81.png)

The project automatically generates the database tables once created in 'src/models'

## For tests
If you want to run tests run the following command:</br>
  
  'npm test'</br>
  
Some tests may fail if you already have data saved to the database. I recommend truncating the 2 tables generated with the following query:</br>
'TRUNCATE bills, products'


### Important: 

In case of running the project on linux or mac, it will be necessary to change the 'test' variable in the package.json file to the following command:
'"test": "NODE_OPTIONS=--experimental-vm-modules && jest --detectOpenHandles",'

## Run expected test
### Important
If you don't want to save products manually, I suggest to run first 'npm test' and then test the checkOut endpoint.


The project has 2 endpoints:</br>
#### POST '/saveProduct'</br>

http://localhost:4000/saveproducts

This endpoint expects an object in json format as follows

```json
{
    "code": "PRODUCT_CODE",
    "name": "PRODUCT_NAME",
    "price": 1.00
}

```

#### POST '/checkOut'</br>

http://localhost:4000/checkOut

If you don't want to save products manually, I suggest to run first 'npm test' and then test the checkOut endpoint and order of items doesn't take effect

```json
{
    "products": {
        "TSHIRT": 3,
        "PANTS": 3,
        "HAT": 1
    }
}

```








