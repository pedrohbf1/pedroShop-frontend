import axios from "axios";
import styled from "styled-components";

const CadaProdutoMeu = ({ produto }) => {

    function deletarProduto () {
        axios.delete(`http://localhost:3000/meus-produtos/${produto.idProduto}`)
        .then((r) => {
            window.location.reload();
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <DetalhesContainer>
            <ImagemProduto src={produto.fotoProduto} alt={produto.nomeProduto} />
            <InformacoesProduto>
                <TituloProduto>{produto.nomeProduto}</TituloProduto>
                <Informacao>Vendedor: {produto.nomeVendedor}</Informacao>
                <QuantidadeLabel htmlFor="quantidade">Quantidade em Estoque: {produto.quantidadeEstoque}</QuantidadeLabel>
                <Informacao style={{textAlign: "left"}}>Valor unitário: {produto.valorUnidade} </Informacao>
                <BotaoAdicionarAoCarrinho onClick={() => deletarProduto()} >Excluir produto</BotaoAdicionarAoCarrinho>
            </InformacoesProduto>
        </DetalhesContainer>
    )
}

export default CadaProdutoMeu

const DetalhesContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
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

const BotaoAdicionarAoCarrinho = styled.button`
  background-color: red;
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
`