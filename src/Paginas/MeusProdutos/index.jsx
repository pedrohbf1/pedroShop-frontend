import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import axios from "axios";
import CadaProdutoMeu from "../../Componentes/CadaProdutoMeu";

const PaginaMeusProdutos = () => {

    const [data, setData] = useState("")

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data")) || [];
        setData(storedData);
    }, []);

    const navigate = useNavigate()

    function sairConta () {
        localStorage.removeItem("data");
        navigate("/")
    }

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [todosProdutos, setTodosProdutos] = useState([])

    useEffect(() => {
        axios.post("http://localhost:3000/meus-produtos", {}, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        .then((r) => {
            setTodosProdutos(r.data)
            
        })
        .catch((erro) => {
            console.log(erro)
        })
    }, [data])

    function cadastrarProduto () {
      navigate("/inicio/meus-produtos/cadastrar-produto")
    }

    return (
        <>
            <HeaderEstilizada>
            <LogoContainer>
                <Link to="/inicio" style={{textDecoration: "none", color: "white", display: "flex", flexWrap: "wrap", gap: "10px"}}>
                <h1>Pedro Shop</h1>
                </Link>
            </LogoContainer>

            
                <SearchSection>
                    Meus produtos
                </SearchSection>
            

            <IconContainer>
                <UserIconWrapper onClick={toggleDropdown}>
                    <FaUser size={24} />
                    {showDropdown && (
                      <>
                        <Dropdown>
                            <Link to="/inicio/minha-conta" style={{textDecoration: "none"}}><DropdownItem>Minha conta</DropdownItem></Link>
                            <Link to="/inicio/minhas-compras" style={{textDecoration: "none"}}><DropdownItem>Minhas compras</DropdownItem></Link>
                            <Link to="/inicio/meus-produtos" style={{textDecoration: "none"}}><DropdownItem>Meus produtos</DropdownItem></Link>
                            <Link to="/inicio/meu-carrinho" style={{textDecoration: "none"}}> <DropdownItem>Meu carrinho</DropdownItem></ Link>
                            <DropdownItem onClick={() => sairConta()} style={{textDecoration: "none"}} >Sair</DropdownItem>
                        </Dropdown>
                        <DropdownMobile>
                            <Link to="/inicio/minha-conta" style={{textDecoration: "none"}}><DropdownItem>Minha conta</DropdownItem></Link>
                            <Link to="/inicio/minhas-compras" style={{textDecoration: "none"}}><DropdownItem>Minhas compras</DropdownItem></Link>
                            <Link to="/inicio/meus-produtos" style={{textDecoration: "none"}}><DropdownItem>Meus produtos</DropdownItem></Link>
                            <Link to="/inicio/meu-carrinho" style={{textDecoration: "none"}}><DropdownItem>Meu carrinho</DropdownItem></Link >
                            <DropdownItem onClick={() => sairConta()}  style={{textDecoration: "none"}}>Sair</DropdownItem>
                        </DropdownMobile>
                        </>
                    )}
                    </UserIconWrapper>
                    <Link to="/inicio/meu-carrinho" style={{textDecoration: "none", color: "white", display: "flex", flexWrap: "wrap", gap: "10px"}} >
                      <FaShoppingBag size={24} />
                    </Link>
            </IconContainer>
        </HeaderEstilizada>

        {todosProdutos.length == 0  ?
        <Centralizador2>
            Você não cadatrou nenhum produto ainda
            <button onClick={() => cadastrarProduto()} >Cadastrar produto</button>
        </Centralizador2> 
        :
        <Centralizador>
            <CreateButton onClick={() => cadastrarProduto()} >Cadastrar produto</CreateButton>
            {todosProdutos && todosProdutos.map((produto, index) => {
                return <CadaProdutoMeu key={index} produto={produto} />
            })}
        </Centralizador>
        }
        </>
    )
}

export default PaginaMeusProdutos

const HeaderEstilizada = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282c36;
  color: white;
  box-sizing: border-box;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;

  h1 {
    font-size: 24px;

    @media (max-width: 500px) {
      font-size: 27px;
    }
  }
`;

const SearchSection = styled.section`
  flex-grow: 1;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 29px;
`;

const IconContainer = styled.span`
  display: flex;
  gap: 50px;
  position: relative;
  :nth-child(2) {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    gap: 50px;
  }
`;

const UserIconWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  background-color: #282c36;
  border-top-left-radius: 5px;
  border-top-right-radius: 1px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 200px;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    right: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #282c36;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const DropdownMobile = styled.div`
  display: none;
  position: absolute;
  top: 65px;
  left: 0;
  background-color: #282c36;
  border-top-left-radius: 1px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex-direction: column;
  z-index: 1;
  width: 200px;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #282c36;
  }
  @media (max-width: 500px) {
    display: flex;
  }
  @media (max-width: 370px ) {
    width: 100px;
  }
`;

const DropdownItem = styled.div`
    padding: 8px;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: #404854;
    }
`;

const Centralizador = styled.main`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 50px auto;
  padding: 30px;
`

const Centralizador2 = styled.main`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 15px;
  height: 50vh;
  box-sizing: border-box;
  color: #454545;
  button {
    border: none;
    background-color: #412CC5;
    color: white;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
        transform: scale(1.06);
    }
  }
`

const CreateButton = styled.button`
    border: none;
    background-color: #412CC5;
    color: white;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
        transform: scale(1.06);
    }

`