import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";

const products = [
  {
    name: "TetriBooks",
    code: "TB-001",
    status: "ACTIVE",
    description: "Accounting & bookkeeping product",
    route: "/admin/plans-manager",
  },
  {
    name: "TetriPeople",
    code: "TP-002",
    status: "ACTIVE",
    description: "HR & people management product",
    route: null,
  },
  {
    name: "TetriStay",
    code: "TS-003",
    status: "INACTIVE",
    description: "Hotel & stay management product",
    route: null,
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleManage = (product) => {
    if (product.route) navigate(product.route);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Products
          </h2>
          <p className="text-sm text-gray-500">
            Manage your available platform products
          </p>
        </div>

  
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top Section */}
            <div>
              {/* Icon + Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Package className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {product.code}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleManage(product)}
              disabled={!product.route}
              className={`mt-6 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
                product.route
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {product.route ? (
                <>
                  Manage Plans <ArrowRight size={16} />
                </>
              ) : (
                "Coming Soon"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
