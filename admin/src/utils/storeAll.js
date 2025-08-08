import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { products } from '../assets/assets.js';


let image1, image2, image3, image4;

const getImageFile = async (relativePath) => {
  const response = await fetch(relativePath);
  const blob = await response.blob();
  const filename = relativePath.split("/").pop();
  return new File([blob], filename, { type: blob.type });
};

const appendImage = async (imageArr) => {
  image1 = image2 = image3 = image4 = null;

  if (imageArr[0]) image1 = await getImageFile(imageArr[0]);
  if (imageArr[1]) image2 = await getImageFile(imageArr[1]);
  if (imageArr[2]) image3 = await getImageFile(imageArr[2]);
  if (imageArr[3]) image4 = await getImageFile(imageArr[3]);
};


export const appendAllData = async (token) => {
    
    for(let i of products){
        let form = new FormData();
        form.append("name", i.name);
        form.append("description", i.description);
        form.append("price", i.price);
        form.append("category", i.category);
        form.append("subCategory", i.subCategory);
        form.append("bestseller", i.bestseller);
        form.append("sizes", JSON.stringify(i.sizes));
        
        await appendImage(i.image);

        image1 && form.append("image1", image1);
        image2 && form.append("image2", image2);
        image3 && form.append("image3", image3);
        image4 && form.append("image4", image4);
        const response = await axios.post(backendUrl + "/api/product/add", form, { headers: {token} });
        console.log(response);
    
    }}

