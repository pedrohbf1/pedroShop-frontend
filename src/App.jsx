import { BrowserRouter, Route, Routes } from "react-router-dom"
import EstilosGlobais from "./Componentes/EstilosGlobais"
import PaginaLogin from "./Paginas/Login"
import PaginaCadastrar from "./Paginas/Cadastrar"
import PaginaInicio from "./Paginas/Inicial"
import { useEffect, useState } from "react"
import NameContext from "./context"
import PaginaProduto from "./Paginas/Produto"
import PaginaMeusProdutos from "./Paginas/MeusProdutos"
import PaginaCriarProduto from "./Paginas/CriarProduto"
import PaginaCarrinho from "./Paginas/Carrinho"
import PaginaMinhaConta from "./Paginas/MinhaConta"
import PaginaMinhasCompras from "./Paginas/MinhasCompras"
import PaginaDetalheCompra from "./Paginas/DetalheCompra"

function App() {

  const storedData = JSON.parse(localStorage.getItem("data")) || [];
  const [data, setData] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <NameContext.Provider value={{data, setData}}>
    <>
      <EstilosGlobais />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/cadastrar" element={<PaginaCadastrar />} />
          <Route path="/inicio" element={<PaginaInicio />} />
          <Route path="/inicio/produto/:id?" element={<PaginaProduto />} />
          <Route path="/inicio/meus-produtos" element={<PaginaMeusProdutos />} />
          <Route path="/inicio/meus-produtos/cadastrar-produto" element={<PaginaCriarProduto />} />
          <Route path="/inicio/meu-carrinho" element={<PaginaCarrinho />} />
          <Route path="/inicio/minha-conta" element={<PaginaMinhaConta />} />
          <Route path="/inicio/minhas-compras" element={<PaginaMinhasCompras />} />
          <Route path="/inicio/minhas-compras/:id?" element={<PaginaDetalheCompra />} />
        </Routes>
      </BrowserRouter>
    </>
    </NameContext.Provider>
  )
}

export default App
