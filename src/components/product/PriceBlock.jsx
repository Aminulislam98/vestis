import React from "react";

const PriceBlockPage = ({ product, isOnSale }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        {isOnSale ? (
          <>
            <span className="font-price font-bold text-red-500 text-xl">
              £{product.salePrice.toFixed(2)}
            </span>
            <span className="font-price text-muted-foreground line-through text-lg">
              £{product.price.toFixed(2)}
            </span>
            <span className="font-body text-base font-semibold text-green-600 dark:text-green-400">
              {Math.round(
                ((product.price - product.salePrice) / product.price) * 100,
              )}
              % off
            </span>
          </>
        ) : (
          <span className="font-semibold text-xl">
            £{product.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceBlockPage;
