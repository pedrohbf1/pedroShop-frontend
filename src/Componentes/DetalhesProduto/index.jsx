import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetalhesProduto = ({ produto }) => {

  const [data, setData] = useState("")

  useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("data")) || [];
      setData(storedData);
  }, []);

  const quantidadeEmEstoque = parseInt(produto.quantidadeEstoque, 10);
  const opcoesQuantidade = Array.from({ length: quantidadeEmEstoque + 1 }, (_, index) => index);

  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const calcularValorTotal = () => {
    const valorUnitario = parseFloat(produto.valorUnidade.replace(",", "."));
    return (quantidadeSelecionada * valorUnitario).toFixed(2);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidadeSelecionada(parseInt(event.target.value, 10));
  };

  const [messageModal, setMessageModal] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const adicionarAoCarrinho = () => {

    const objeto = {
      nomeVendedor: produto.nomeVendedor,
      nomeProduto: produto.nomeProduto,
      quantidade: quantidadeSelecionada,
      valorUnidade: produto.valorUnidade,
      fotoProduto: produto.fotoProduto,
      tokenComprador: data.token
    }
    
    axios.post("http://localhost:3000/carrinho", objeto)
    .then(() => {
      setMessageModal(`Adicionando ${quantidadeSelecionada} ${produto.nomeProduto} ao carrinho.`);
      setOpenModal(true)
      navigate("/inicio")
    })
    .catch((erro) => {
      console.log(erro)
      setMessageModal("Erro ao adicionar ao carrinho! Abra o console para saber mais")
      setOpenModal(true)
    })
  };

  return (
    <DetalhesContainer>
      <ImagemProduto src={produto.fotoProduto} alt={produto.nomeProduto} />
      <InformacoesProduto>
        <TituloProduto>{produto.nomeProduto}</TituloProduto>
        <Informacao>Vendedor: {produto.nomeVendedor}</Informacao>
        <QuantidadeLabel htmlFor="quantidade">Quantidade em Estoque:</QuantidadeLabel>
        <QuantidadeSelect id="quantidade" value={quantidadeSelecionada} onChange={handleQuantidadeChange}>
          {opcoesQuantidade.map((opcao) => (
            <QuantidadeOption key={opcao} value={opcao}>
              {opcao}
            </QuantidadeOption>
          ))}
        </QuantidadeSelect>
        <Informacao style={{textAlign: "center"}}>Valor total: R$ {calcularValorTotal()}</Informacao>
        <BotaoAdicionarAoCarrinho onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</BotaoAdicionarAoCarrinho>
      </InformacoesProduto>
      {openModal && <Modal title="Produto adicionado ao carrinho" message={messageModal} estado={setOpenModal} />}
    </DetalhesContainer>
  );
};

export default DetalhesProduto;

const DetalhesContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImagemProduto = styled.img`
  max-width: 300px;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InformacoesProduto = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 20px;
`;

const TituloProduto = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  box-sizing: border-box;
  color: #333;
`;

const Informacao = styled.p`
  margin-bottom: 8px;
  color: #555;
  box-sizing: border-box;
`;

const QuantidadeLabel = styled.label`
  display: block;
  margin-top: 10px;
  color: #777;
  box-sizing: border-box;
`;

const QuantidadeSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  color: #333;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const QuantidadeOption = styled.option`
  color: #333;
  box-sizing: border-box;
`;

const BotaoAdicionarAoCarrinho = styled.button`
  background-color: #412CC5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    transform: scale(1.03);
  }
`;
