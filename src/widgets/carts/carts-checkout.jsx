import React from "react";
import { useProducts } from "@/store/context/ProductContext";

export function CartsCheckout({ cart }) {
  const { productsById, getProductById } = useProducts();
  const [singleProduct, setSingleProduct] = React.useState(null);

  React.useEffect(() => {
    if (!singleProduct) {
      getProductById(cart.productId);
    }
    if (productsById?._id === cart.productId) {
      setSingleProduct(productsById)
    }
  }, [
    cart.productId,
    productsById,
    singleProduct
  ])

  return (
    <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">

      <div className="w-full flex items-center">
        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
          <img src={singleProduct?.pic} alt="" />
        </div>
        <div className="flex-grow pl-3">
          <h6 className="font-semibold uppercase text-gray-600">{singleProduct?.nameProduct}</h6>
          <p className="text-gray-400">x {cart.quantity}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-600 text-xl">${cart.price}</span>
        </div>
      </div>
    </div>
  );
}

export default CartsCheckout;
