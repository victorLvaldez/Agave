import { Product } from '../models/Product.js'
import { Bill } from '../models/Bill.js'


export const saveProduct = async (req, res) => {
    const { code, name, price } = req.body
    try {
        const [newProduct, created] = await Product.findOrCreate({
            where: {
                code
            },
            defaults: {
                name,
                price
            }
        })

        if (created) {
            res.status(201).json({
                message: "product created successfully"
            })
        }else{
            res.status(500).json({
                message: "Product already exists"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }


}

export const checkOut = async(req, res) => {
    const {products} = req.body;

    let total = 0
    try{
        for(var key in products){
            const priceObj = await Product.findOne({ where: { code:key }, attributes:['price']});
            let price = priceObj.dataValues.price
            if(key === 'PANTS'){
                const itemReceivable = Math.floor(products[key] / 2) + (products[key] % 2)
                total = total + (itemReceivable*price)
            }else if(key === 'TSHIRT' && products[key] >=3 ){
                    total = total + (price*products[key]) - products[key]
            }
            else{
                total = total + (price*products[key])
            }
        }
        
        const newProduct = await Bill.create({
            items: products,
            total
        })
        

        if(newProduct){
            res.status(200).json({
                total
            })
        }
    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}