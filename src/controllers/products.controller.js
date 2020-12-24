import Product from '../models/Product'

export const createProduct = async ( req, res ) => {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product( { name, category, price, imgUrl } );
    const productSaved = await newProduct.save();
    res.status( 201 ).json( productSaved );
};

export const getProductById = async ( req, res ) => {
    const id = req.params.productId;
    const product = await Product.findById( id )
    res.json( product )
};

export const getProducts = async ( req, res ) => {
    const products = await Product.find( { available: true } );
    res.json( products );
};

export const updateProductById = async ( req, res ) => {
    const id = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate( id, req.body, { new: true } )
    res.json({
        product: updatedProduct
    })
};

export const deleteProductById = async ( req, res ) => {
    const id = req.params.productId;
    const deletedProduct = await Product.findByIdAndUpdate( id, { available: false }, { new: true } );
    res.json({
        product: deletedProduct
    });
};