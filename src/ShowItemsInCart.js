import { useData } from "./context/data-context";

export function ShowItemsInCart({ item }) {

  const { dispatch } = useData();

  return (
    <div className="card-container">
      <div className="card card-shadow card-badge">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src="./assests/bicycle-images/bicycle-1.jpg" alt="bicycle-1" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{item.name}</h3>
          </div>
          <div className="card-price">{item.price}</div>
          <div>
            <button 
              className="btn btn-secondary" 
              onClick={() => dispatch({ type: "INC_QTY", payload: item})}> + </button>
            <span> Quantity: {item.count} </span>
            <button 
              className="btn btn-secondary"
              onClick={() => dispatch({ type: "DEC_QTY", payload: item})}
              > - </button>
          </div>
          
          <button className="btn btn-primary" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item})}>
            Remove from Cart
          </button>
          
        </div>
      </div>
    </div>
  );
}
