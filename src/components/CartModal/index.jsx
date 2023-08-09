import { useState } from "react";
import close from "../../assets/x.svg";
import { CartItemCard } from "./CartItemCard";
import style from "./style.module.scss"

export const CartModal = ({ cartList, setVisible}) => {
   const [len, setLen] = useState(false)

   const closeModal = () =>{
      setVisible(false)
   }
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   return (
      <div role="dialog" className={style.modalOverlay}>
         <div className={style.modal}>
            <div className={style.modalHeader}>
               <h2 className="title three white">Carrinho de compras</h2>
               <button aria-label="close" title="Fechar" onClick={()=>{closeModal()}}>
                  <img src={close} alt="X" />
               </button>
            </div>
            <div className={style.modalList}>
               {cartList.length === 0 ? (
                  <span className="title headline grey">A lista de produtos está vazia😢</span>
               ): (
                  <ul>
                     {cartList.map((product) => (
                        <CartItemCard key={product.id} product={product} len={len} setLen={setLen}/>
                     ))}
                  </ul>
                  )}
            </div>   
            <div className={style.modalFooter}>
               <div>
                  <span className="title four black">Total</span>
                  <span className="title grey">{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
               </div>
               <button className="button">Remover todos</button>
            </div>
         </div>
      </div>
   );
};
