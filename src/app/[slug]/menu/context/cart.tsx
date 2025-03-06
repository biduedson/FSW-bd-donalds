"use client";

import { Product } from "@prisma/client"; // Importa a interface do modelo Product do Prisma
import { createContext, ReactNode, useState } from "react";

// Define a interface para os produtos do carrinho
// Ela herda os campos "id", "name", "price" e "imageUrl" do modelo Product do Prisma
export interface CartProduc
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number; // Adiciona um campo extra "quantity" para controlar a quantidade do produto no carrinho
}

// Define a interface para o contexto do carrinho
export interface ICartContext {
  isOpen: boolean; // Estado que indica se o carrinho está aberto ou fechado
  products: CartProduc[]; // Lista de produtos no carrinho
  toggleCart: () => void; // Função para abrir/fechar o carrinho
  addProduct: (product: CartProduc) => void; // Função para adicionar um produto ao carrinho
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
}

// Cria o contexto do carrinho com valores iniciais padrão
export const CartContext = createContext<ICartContext>({
  isOpen: false, // O carrinho começa fechado
  products: [], // Lista inicial de produtos vazia
  toggleCart: () => {}, // Função vazia como placeholder
  addProduct: () => {}, // Função vazia como placeholder
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
});

// Componente que fornece o contexto do carrinho para toda a aplicação
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduc[]>([]); // Estado que armazena os produtos do carrinho
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado que controla se o carrinho está aberto

  // Função para alternar a visibilidade do carrinho
  const toggleCart = () => {
    setIsOpen((prev) => !prev); // Inverte o estado atual
  };

  // Função para adicionar um produto ao carrinho
  const addProduct = (product: CartProduc) => {
    // Verifica se o produto já está no carrinho
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    // Se o produto ainda não está no carrinho, adiciona ele com a quantidade informada
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    // Se o produto já existe no carrinho, aumenta a quantidade
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + 1, // Incrementa a quantidade do produto existente
          };
        }
        return prevProduct; // Retorna os outros produtos sem alteração
      });
    });
  };
  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };
  return (
    // Provedor do contexto que disponibiliza o estado e as funções do carrinho para os componentes filhos
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
      }}
    >
      {children} {/* Renderiza os componentes filhos dentro do contexto */}
    </CartContext.Provider>
  );
};
