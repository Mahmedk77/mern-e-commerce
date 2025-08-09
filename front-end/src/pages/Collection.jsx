import { use, useContext, useEffect, useState } from "react";
import {
  Collections,
  ProductsItem,
  Sidebar,
  SidebarItem,
  Title,
} from "../components";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortedOpt, setSortedOpt] = useState("relavent");
  
  const applyFilter = () => {
    let productsCopy = products.slice(); //creates a copy of products;
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
    );
  }
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      subCategory.includes(item.subCategory)
  );
}
if((search.length>0) && showSearch){
      productsCopy = productsCopy.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortedOpt) {
      console.log("in sorted");
      switch (sortedOpt) {
        case "high-low":
          productsCopy.sort((a, b) => b.price - a.price);
          break;
        case "low-high":
          productsCopy.sort((a, b) => a.price - b.price);
          break;
        default:
          productsCopy = [...productsCopy];
      }
    }

    setFilterProducts(productsCopy);
  };

  const handleCategoryFilter = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const handleSubCategoryFilter = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortedOpt, search, showSearch, products]);

  return (
    <div className={`flex flex-col md:flex-row gap-1 sm:gap-10 pt-10 border-gray-200 ${showSearch ? "" : "border-t"}`}>
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={handleCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={handleSubCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSubCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={handleSubCategoryFilter}
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-xl mb-4">
          <Title text1={"ALL"} text2={"Collections"} />
          <select
            onChange={(e) => setSortedOpt(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, idx) => {
            return (
              <ProductsItem
                key={idx}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
