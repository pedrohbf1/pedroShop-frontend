import styled from "styled-components";
import { FaEye, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Produto = ({ produto }) => {

  const link = `/inicio/produto/${produto.idProduto}`

  return (
    <CardContainer>
      <Link to={link} style={{textDecoration: "none"}} >
      <ProductImage src={produto.fotoProduto} alt={produto.nomeProduto} />
      <CardContent>
        <Title>{produto.nomeProduto}</Title>
        <Price>
          R$ <span>{produto.valorUnidade}</span>
        </Price>
        <ActionButtons>
          <IconButton style={{alignItems: "center", justifyContent: "center", display: "flex", gap: "10px"}}>
            <FaEye size={24} />
            Ver mais
          </IconButton>
        </ActionButtons>
      </CardContent>
      </Link>
    </CardContainer>
  );
};

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #412cc5;
  max-width: 200px;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px ;
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1`
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  margin: 10px 0;
  color: #333;
  text-align: center;
  @media (max-width: 200px) {
    box-sizing: border-box;
  }
`;

const Price = styled.div`
  width: 100%;
  font-size: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
  span {
    color: #412cc5;
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 200px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const IconButton = styled.div`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #412cc5;
  }
`;

export default Produto;
