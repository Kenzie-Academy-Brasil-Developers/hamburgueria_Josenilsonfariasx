import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { ProductList } from "../../components/ProductList";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { api } from "../../services/api";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const savedCartList = JSON.parse(localStorage.getItem("@humburgueriaKenzie"))
   const [cartList, setCartList] = useState([]);
   const [visible, setVisible] = useState(false)
   const [search, setSearch] = useState("")

      const filter = productList.filter((product)=>{
         const filterSearch = search === "" ? productList :
         product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
         product.category.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      
         return filterSearch
      })
   
   useEffect(()=>{   
      setCartList(savedCartList)
      const getProducts = async () =>{
         const {data} = await api.get()
         setProductList(data)
      }
      getProducts()
   },[])


   useEffect(()=>{
      const saveLocalStorageCartList = () =>{
         localStorage.setItem("@humburgueriaKenzie", JSON.stringify(cartList))
      } 
      saveLocalStorageCartList()
   },[cartList])

   return (
      <DefaultTemplate setVisible={setVisible} visible={visible} cartList={cartList} search={search} setSearch={setSearch}>
            <ProductList productList={filter} cartList={cartList} setCartList={setCartList}/>
            {visible ? <CartModal setVisible={setVisible} cartList={cartList} setCartList={setCartList} /> : null}
      </DefaultTemplate>
   );
};
