import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NftCard(props) {
  const { user, dispatch } = useAuthContext();
  const { _id, name, price, image, artist, category } = props.nft;
  const nav = useNavigate();
  const addToCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/nfts/${_id}/addToCart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok && json.success) {
        dispatch({
          type: "ADD_TO_CART",
          payload: json.data,
        });
        toast.success(json.message);
      } else {
        toast.error(json.error);
        console.log(json.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="nft-card-container">
      <div className="nft-card">
        <div className="nft-card-category bg-ac3">{category}</div>
        <div className="nft-card-price bg-ac3">{price} ETH</div>
        <div className="nft-card-image">
          <img src={image} alt={props.name} />
        </div>
        <div className="nft-card-info">
          <div className="nft-card-name">{name}</div>
          <span className="nft-card-artist c-ac2">@{artist}</span>
          {/* <div className="nft-card-description">Desc</div> */}
        </div>
        <div className="nft-card-actions">
          <button className="btn-box-outline">Details</button>
          {user?.shoppingCart.find((nftId) => nftId === _id) ? (
            <button
              className="btn-box-outline in-cart"
              onClick={() => nav("/cart")}
            ></button>
          ) : (
            <button className="btn-box-primary" onClick={addToCart}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NftCard;
