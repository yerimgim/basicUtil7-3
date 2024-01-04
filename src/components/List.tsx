import React, { useEffect, useState } from "react";
import { products } from "../mocks/Products";
import "../style.css";

const List = () => {
  const [filterdProduct, setFilteredProduct] = useState(products);
  const [inputValue, setInputValue] = useState("");
  const buttons = [
    "all",
    ...new Set(
      products.map(product => {
        return product.company;
      })
    ),
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const filterList = products.filter(product => {
      return product.title.toLowerCase().includes(inputValue);
    });

    setFilteredProduct(filterList);
  }, [inputValue]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLElement;
    const datasetId = target.dataset.id;

    if (datasetId === "all") {
      setFilteredProduct(products);
    } else {
      const filteredList = products.filter(product => {
        return product.company === datasetId;
      });
      setFilteredProduct(filteredList);
    }
  };

  return (
    <section className="products">
      <div className="filters-container">
        <form className="input-form">
          <input
            type="text"
            className="search-input"
            placeholder="search..."
            onChange={handleSearch}
          />
        </form>
        <h5>Company</h5>
        <article className="companies">
          {buttons.map(company => {
            return (
              <button
                className="company-btn"
                data-id={company}
                key={company}
                onClick={e => {
                  handleButton(e);
                }}
              >
                {company}
              </button>
            );
          })}
        </article>
      </div>
      <div className="products-container">
        {filterdProduct && filterdProduct.length ? (
          filterdProduct.map(product => {
            return (
              <article
                className="product"
                data-id={product.id}
                key={product.id}
              >
                <img src={product.image} alt="" className="product-img img" />
                <footer>
                  <h5 className="product-name">{product.title}</h5>
                  <span className="product-price">{product.price}</span>
                </footer>
              </article>
            );
          })
        ) : (
          <h6>Sorry, no products matched your search</h6>
        )}
      </div>
    </section>
  );
};

export default List;
