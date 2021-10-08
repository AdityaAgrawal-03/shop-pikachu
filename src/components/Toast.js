import { useEffect, useRef } from "react";


export function Toast({ toast, setToast, bagType }) {
  const previousToast = useRef();

  previousToast.current = setTimeout(() => {
    setToast(false);
  }, 3000);

  useEffect(() => {
    return () => clearTimeout(previousToast.current)
  }, [])

  // useEffect(() => {
  //   let timerId = setTimeout(() => {
  //     setToast(false);
  //   }, 3000);

  //   return () => clearTimeout(timerId);
  // }, [setToast]);

  return (
    <div>
      <div
        className={toast
          ? "alert success-alert top-right-toast-open"
          : "alert success-alert top-right-toast"}
      >
        <span className="material-icons-outlined md-24">task_alt</span>
        {bagType === "cart" ? (
          <> Product added to cart! </>
        ) : (
          <> Product added to wishlist! </>
        )}
      </div>
    </div>
  );
}
