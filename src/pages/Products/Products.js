import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useData } from "../../context/DataContext";
import "./Products.css";

export function Products() {
  const {
    state: { inventory, sortBy, showFastDeliveryOnly, showInventoryAll },
    dispatch,
  } = useData();


  const getSortedData = (productList, sortBy) => {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }

    return productList;
  };

  const getFilteredData = (
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) => {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  };

  const sortedData = getSortedData(inventory, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
  });

  return (
    <div className="product-page">
      <div className="filter-container">
        <h2>Filters</h2>

        <hr />

        <div className="filter-category">
          <div className="filter-header">
            <h3>Availability </h3>
          </div>
          <div className="filter-options">
            <label>
              <span>Include out of stock</span>
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              ></input>
            </label>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-header">
            <h3>Pricing </h3>
          </div>
          <div className="filter-options">
            <label>
              <span>High to Low</span>
              <input
                type="radio"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              ></input>
            </label>
            <label>
              <span>Low to High</span>
              <input
                type="radio"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              ></input>
            </label>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-header">
            <h3>Delivery</h3>
          </div>
          <div className="filter-options">
            <label>
              Fast delivery
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              />
            </label>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-header">
            <h3>Bikes</h3>
          </div>
          <div className="filter-options">
            <label>
              Mountain Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_MOUNTAIN_BIKE" })}
              />
            </label>
            <label>
              Road Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_ROAD_BIKE" })}
              />
            </label>
            <label>
              Hybrid Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_HYBRID_BIKE" })}
              />
            </label>
            <label>
              Kids Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_KIDS_BIKE" })}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="card-container">
        {filteredData.map((product) => (
          <ProductCard product={product} key={product._id} isUserLoggedIn={true} />
        ))}
      </div>
    </div>
  );
}
