import app from '../src/app.js'
import { checkOut, saveProduct } from "../src/controllers/products.controllers";
import request from 'supertest'


describe('POST /saveProduct', () => {


    //should response with a 200 status code if is correct
    test('Should respond with a 201 status code',async () => {
        const response = await request(app).post('/saveProduct').send({
            code: "TSHIRT",
            name: "T-shirt",
            price: 20.00
        })
        expect(response.statusCode).toBe(201)
    })

    test('Should respond with a 201 status code',async () => {
        const response = await request(app).post('/saveProduct').send({
            code: "PANTS",
            name: "Pants",
            price: 5.00
        })
        expect(response.statusCode).toBe(201)
    })

    test('Should respond with a 201 status code',async () => {
        const response = await request(app).post('/saveProduct').send({
            code: "HAT",
            name: "Hat",
            price: 7.50
        })
        expect(response.statusCode).toBe(201)
    })

    //should response with a 500 status code if attribute is missing
    test('Should respond with a JSON object',async () => {
        const response = await request(app).post('/saveProduct').send({
            code: "PANTS",
            price: 20.00
        })
        expect(response.statusCode).toBe(500)
    })

    //should response with a 500 status code if item already exists
    test('should response with a json object containing the total',async () => {
        const response = await request(app).post('/saveProduct').send({
            code: "TSHIRT",
            name: "T-shirt",
            price: 20.00
        })
        expect(response.statusCode).toBe(500);
    })
})


describe('POST /checkout', () => {

    test('Should respond with a 500 status code',async () => {
        const response = await request(app).post('/checkout').send()
        expect(response.statusCode).toBe(500) //no tiene un objeto para guardar
    })

    //should response with a 200 status code
    test('Should respond with a 200 status code',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 3,
                "PANTS": 3,
                "HAT": 1
            }
        })
        expect(response.statusCode).toBe(200)
    })

    //Should responf with a JSON object
    test('Should respond with a JSON object',async () => {
        const response = await request(app).post('/checkout').send()
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        ) 
    })

    //should response with a json object containing the total
    test('should response with a json object containing the total',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 1,
                "PANTS": 1,
                "HAT": 1
            }
        })
        expect(response.body.total).toBeDefined();
    })

    //should response with total amount to be paid
    //Items: PANTS, TSHIRT, HATTotal: $32.50
    test('Should respond with a total correct',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 1,
                "PANTS": 1,
                "HAT": 1
            }
        })
        expect(response.body.total).toEqual(32.50);
    })

    //should response with total amount to be paid
    //Items: PANTS, TSHIRT, PANTS Total: $25.00
    test('Should respond with a total correct',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 1,
                "PANTS": 2,
            }
        })
        expect(response.body.total).toEqual(25.00);
    })

    //should response with total amount to be paid
    //Items: TSHIRT, TSHIRT, TSHIRT, PANTS, TSHIRT Total: $81.00
    test('Should respond with a total correct',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 4,
                "PANTS": 1,
            }
        })
        expect(response.body.total).toEqual(81.00);
    })

    //should response with total amount to be paid
    //Items: PANTS, TSHIRT, PANTS, PANTS, HAT, TSHIRT, TSHIRT Total: $32.50
    test('Should respond with a total correct',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 3,
                "PANTS": 3,
                "HAT": 1
            }
        })
        expect(response.body.total).toEqual(74.50);
    })

    //Should response with status error if producto does not exists
    test('Should respond with a total correct',async () => {
        const response = await request(app).post('/checkout').send({
            "products": {
                "TSHIRT": 3,
                "SHOES": 3,
                "HAT": 1
            }
        })
        expect(response.statusCode).toBe(500)
    })
})

