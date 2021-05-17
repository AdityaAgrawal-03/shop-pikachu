import { ProductCard } from "../../components/ProductCard";
import { useData } from "../../context/data-context";
import { data } from "../../data/data";
import "./Products.css";

export function Products({ setRoute }) {
  const {
    state: { sortBy, showFastDeliveryOnly, showInventoryAll },
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

  const sortedData = getSortedData(data, sortBy);
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
            <p>Mountain Bikes</p>
            <p>Road Bikes</p>
            <p>Hybrid Bikes</p>
            <p>Kids Bikes</p>
          </div>
        </div>
      </div>
      <div className="card-container">
        {filteredData.map((item) => (
          <ProductCard item={item} key={item.id} setRoute={setRoute} />
        ))}
      </div>
    </div>
  );
}
