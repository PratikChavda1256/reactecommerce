import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../Actions/Product';
import { addToCart } from '../../Actions/Cart';
import Loading from '../Loader/Loading';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity // Assuming quantity is defined in your component
        })
      );
      navigate('/cart'); // Navigate after successful addToCart action
    } else {
      // Show login modal or pop-up message
      setShowLoginModal(true);
    }
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto mt-4">
        <p>Product not found</p>
      </div>
    );
  }

  const gradientBackground = {
    background: 'linear-gradient(to right, #ff7e5f, #b16c37)',
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-auto rounded-lg object-contain max-h-96"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <h2 className="text-2xl font-semibold mb-4">&#x20B9;{product.price}</h2>
            <p className="mb-4">{product.desc}</p>

            <button
              onClick={handleAddToCart}
              style={gradientBackground}
              className="mt-6 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Login Required</p>
            <p className="text-sm mb-4">You need to login to add items to your cart.</p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
              style={gradientBackground} // Ensure button color contrasts with modal background
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
