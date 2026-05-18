import { useEffect, useState } from "react";
import styles from "./ListProducts.module.scss";

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  in_stock: boolean;
  colors: string[];
  details: {
    brand: string;
    model: string;
  };
}

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product/product.json");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {products.length > 0 ? (
        <ul className={styles.list}>
          {products.map((data, idx) => (
            <li key={idx} className={styles.item}>
              <div className={styles.itemTop}>
                <span className={styles.status}>
                  {data.in_stock ? "Em estoque" : "Esgotado"}
                </span>
              </div>

              <p className={styles.name}>{data.product_name}</p>

              <div className={styles.meta}>
                <div className={styles.price}>R$ {data.price.toFixed(2)}</div>
                <div className={styles.brand}>
                  {data.details.brand} — {data.details.model}
                </div>
                <div className={styles.colors}>
                  Cores: {data.colors.join(", ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>Carregando produtos...</div>
      )}
    </div>
  );
};

export default ListProducts;
