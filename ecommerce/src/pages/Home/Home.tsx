import { useEffect, useState } from "react";
import { getAllProducts } from "../../proxy/Products/GetAllProducts";
import { Layout } from "../../components/Layout/Layout";
import { useProductContext } from "../../context/ProductContext";
import './Home.css'

export const Home = () => {
    const { products, setProducts } = useProductContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return(
        <Layout>
            <div className="search">
                <input type="search" />
               
                <div className="button-search">
                     <button></button>
                     <img src="/images/search_17450802.png" alt="lupa" />
                </div>
               
            </div>
            <div className="container-products">
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
            <div className="products">
                {
                    products.map((product) => (
                        <div className="product">
                            <div className="product-image">
                                <img src={product.images[0]} alt="imagen producto" />
                            </div>
                            <div className="product-detail">
                                <label>{product.title}</label>
                                <label>${product.price}</label>
                                <label>{product.sku}</label>
                            </div>
                            <div className="product-buy">
                                <button>Comprar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            )}
            </div>
        </Layout>
    )
}