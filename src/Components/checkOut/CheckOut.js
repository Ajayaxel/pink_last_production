// CheckoutPage.jsx - Enhanced checkout with address management and fixed image handling
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Edit, Trash2, CreditCard, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from CartPage navigation
  const { userId, totalAmount, cartItems } = location.state || {};
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // New address form state
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'UAE',
    isDefault: false
  });

  // Function to build proper image URL
  const buildImageUrl = (imgPath) => {
    if (!imgPath || imgPath.length === 0) return '/placeholder-image.jpg';
    
    // If it's already a full URL, return as is
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    
    // If it's a relative path, build the full URL
    const cleanedPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `https://backend.pinkstories.ae/${cleanedPath}`;
  };

  // Redirect if no checkout data
  useEffect(() => {
    if (!userId || !cartItems || !totalAmount) {
      navigate('/cart');
      return;
    }
    fetchAddresses();
  }, [userId, cartItems, totalAmount, navigate]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7000/api/addresses/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setAddresses(data.addresses || []);
        // Auto-select default address or first address
        const defaultAddr = data.addresses?.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr._id);
        } else if (data.addresses?.length > 0) {
          setSelectedAddress(data.addresses[0]._id);
        }
      } else {
        console.error('Failed to fetch addresses:', data.message);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:7000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...newAddress
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAddresses(prev => [...prev, data.address]);
        setSelectedAddress(data.address._id);
        setNewAddress({
          fullName: '',
          phoneNumber: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'UAE',
          isDefault: false
        });
        setShowAddAddressForm(false);
      } else {
        setError(data.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      setError('Failed to add address');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`http://localhost:7000/api/addresses/${editingAddress._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...newAddress
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAddresses(prev => prev.map(addr => 
          addr._id === editingAddress._id ? data.address : addr
        ));
        setEditingAddress(null);
        setNewAddress({
          fullName: '',
          phoneNumber: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'UAE',
          isDefault: false
        });
      } else {
        setError(data.message || 'Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      setError('Failed to update address');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    
    try {
      const response = await fetch(`http://localhost:7000/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setAddresses(prev => prev.filter(addr => addr._id !== addressId));
        if (selectedAddress === addressId) {
          const remaining = addresses.filter(addr => addr._id !== addressId);
          setSelectedAddress(remaining.length > 0 ? remaining[0]._id : null);
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      setError('Failed to delete address');
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingAddress(address);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    const selectedAddr = addresses.find(addr => addr._id === selectedAddress);
    
    navigate('/payment-details', {
      state: {
        userId,
        totalAmount,
        cartItems,
        deliveryAddress: selectedAddr
      }
    });
  };

  const calculateShipping = () => {
    // Add your shipping calculation logic here
    return totalAmount > 200 ? 0 : 25; // Free shipping over AED 200
  };

  const shippingCost = calculateShipping();
  const finalTotal = totalAmount + shippingCost;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading checkout...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Address & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setShowAddAddressForm(true);
                    setEditingAddress(null);
                  }}
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No addresses found</h3>
                  <p className="text-gray-600 mb-4">Add your delivery address to continue</p>
                  <button
                    onClick={() => setShowAddAddressForm(true)}
                    className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress === address._id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(address._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={selectedAddress === address._id}
                            onChange={() => setSelectedAddress(address._id)}
                            className="mt-1"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {address.fullName}
                              {address.isDefault && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {address.city}, {address.state} {address.postalCode}
                            </p>
                            <p className="text-gray-600 text-sm">{address.country}</p>
                            <p className="text-gray-600 text-sm mt-1">Phone: {address.phoneNumber}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address._id);
                            }}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {cartItems?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <img
                        src={buildImageUrl(item.image)}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                        {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                        {item.sku && <div>SKU: {item.sku}</div>}
                      </div>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">AED {(item.price * item.quantity).toFixed(2)}</p>
                      {item.discountedPrice && item.discountedPrice !== item.price && (
                        <p className="text-sm text-green-600">
                          Discounted: AED {(item.discountedPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">AED {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `AED ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-red-600">AED {finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedAddress || submitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                {submitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Address Modal */}
        {(showAddAddressForm || editingAddress) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.fullName}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newAddress.phoneNumber}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.addressLine1}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={newAddress.addressLine2}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      required
                      value={newAddress.country}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Oman">Oman</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddAddressForm(false);
                      setEditingAddress(null);
                      setNewAddress({
                        fullName: '',
                        phoneNumber: '',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        country: 'UAE',
                        isDefault: false
                      });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;