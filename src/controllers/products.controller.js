import Product from '../models/Product';

export const createProduct = async ( req, res ) => {
    try {
        const { name, category, price, imgUrl } = req.body;
        const newProduct = new Product( { name, category, price, imgUrl } );
        const productSaved = await newProduct.save();
        res.status( 201 ).json({
            ok: true,
            product: productSaved
        });
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
};

export const getProductById = async ( req, res ) => {
    const id = req.params.productId;
    const product = await Product.findById( id )
    res.status( 200 ).json({
        ok: true,
        product
    });
};

export const getProducts = async ( req, res ) => {
    const products = await Product.find( { available: true } );
    res.json({
        ok: true,
        products,
    });
};

export const updateProductById = async ( req, res ) => {
    const body = req.body;
    const id = req.params.productId;
    body.available = true;
    const updatedProduct = await Product.findByIdAndUpdate( id, body, { new: true } )
    res.status( 200 ).json({
        ok: true,
        product: updatedProduct
    });
};

export const deleteProductById = async ( req, res ) => {
    const id = req.params.productId;
    const disabledProduct = await Product.findByIdAndUpdate( id, { available: false }, { new: true } );
    res.json({
        ok: true,
        product: disabledProduct
    });
};