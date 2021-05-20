import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useData } from "../../context/data-context";
import { data } from "../../data/data";
import "./Products.css";

export function Products({ setRoute }) {
  const {
    state: {
      sortBy,
      showFastDeliveryOnly,
      showInventoryAll,
      sortByType
    },
    dispatch,
  } = useData();

  // const getFilteredDataByType = (productList, sortByType) => {
  //   if (sortByType && sortByType === "MOUNTAIN_BIKE") {
  //     return productList.filter(({ bikes }) => bikes["mountainBike"])
  //   }

  //   if (sortByType && sortByType === "HYBRID_BIKE") {
  //     return productList.filter(({ bikes }) => bikes["hybridBike"])
  //   }

  //   if (sortByType && sortByType === "ROAD_BIKE") {
  //     return productList.filter(({ bikes }) => bikes["roadBike"])
  //   }

  //   if (sortByType && sortByType === "KIDS_BIKE") {
  //     return productList.filter(({ bikes }) => bikes["kidsBike"])
  //   }
  // }

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
            <label>
              Mountain Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_BIKE", payload: "MOUNTAIN_BIKE" })}
              />
            </label>
            <label>
              Road Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_BIKE", payload: "ROAD_BIKE" })}
              />
            </label>
            <label>
              Hybrid Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_BIKE", payload: "HYBRID_BIKE" })}
              />
            </label>
            <label>
              Kids Bikes
              <input
                type="checkbox"
                onChange={() => dispatch({ type: "TOGGLE_BIKE", payload: "KIDS_BIKE" })}
              />
            </label>
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
