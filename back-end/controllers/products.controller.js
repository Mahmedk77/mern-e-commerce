import {v2 as cloudinary} from "cloudinary";

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

        const product = new Prod

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(image1, image2, image3, image4);
        console.log(imagesUrl);
        

        res.json({ success: true });
        
    } catch (error) {
        console.log(error);
        res.json({ message: error.message })
    }

}

//Remove a Product
export const removeProduct = async (req, res) => {
    
}

//
export const singleProduct = async (req, res) => {
    
}
export const listProducts= async (req, res) => {
    
}


