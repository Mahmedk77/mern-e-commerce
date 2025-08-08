import {v2 as cloudinary} from "cloudinary";
import Product from "../models/products.model.js";

//Add a Product
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, 
        subCategory, sizes, bestseller }= req.body;

        const image1 =  req.files.image1 && req.files.image1[0];
        const image2 =  req.files.image2 && req.files.image2[0];
        const image3 =  req.files.image3 && req.files.image3[0];
        const image4 =  req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(i => i !== undefined);

        let imagesUrl = await Promise.all(
            images.map( async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_path: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name, 
            description, 
            price: Number(price), 
            category,
            subCategory, 
            sizes, 
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl 
        }
        
        console.log(productData);

        const product = new Product(productData);
        await product.save();

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(image1, image2, image3, image4);
        console.log(imagesUrl);
        

        res.json({ success: true, message: "Product Added Successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add product. Try again." })
    }

}

//Remove a Product
export const listProducts= async (req, res) => {
    try {
        const products =  await Product.find();
        res.json({success: true, products, nHbits: products.length});

    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, messsage: error.message})
    }
}


export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//
export const singleProduct = async (req, res) => {

    try {
        const  { id }  = req.body;
        const product = await Product.findById(id);

    res.status(200).json({success: true, data: product});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, messsage: error.message})
    }

    
}


