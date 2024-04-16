import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFileAdd } from 'react-icons/ai'
import firebaseapp from "../../firebase";
import { StorageErrorCode, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { ThreeDots } from "react-loader-spinner"

const PaginaCriarProduto = () => {

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

  const [nomeProduto,  setNomeProduto] = useState("")
  const [quantidadeEstoque, setQuantidadeEstoque] = useState("")
  const [valorUnitario, setValorUnitario] = useState("")
  const [fotoProduto, setFotoProduto] = useState("")

  const [campoVazio, setCampoVazio] = useState(false)
  const [arquivoStorage, setArquivoStorage] = useState("")
  const [recarregar, setRecarregar] = useState(false)

  const handleFileChange = async (event) => {
    setRecarregar(true)
    const file = event.target.files[0]
    if(file) {
        const reader = new FileReader()
        reader.onload = () => {
          setFotoProduto(reader.result)
        } 
        reader.readAsDataURL(file)
    }

    const storage = getStorage(firebaseapp)
    const timestamp = Date.now()

    const storageRef = ref(storage, `imagens/${timestamp}------${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)

    setArquivoStorage(url)
  };

  useEffect(() => {
    if(arquivoStorage != "") {
      setRecarregar(false)
    }
  }, [arquivoStorage])

  function cadastrarProduto (e) {
    e.preventDefault()
    if (nomeProduto == "" || quantidadeEstoque == "" || valorUnitario == "" || fotoProduto == "") {
        setCampoVazio(true)
    } else {
      setCampoVazio(false)
        const objeto = {
            nomeVendedor: data.nome,
            tokenVendedor: data.token,
            nomeProduto: nomeProduto,
            quantidadeEstoque: quantidadeEstoque,
            valorUnidade: valorUnitario,
            fotoProduto: arquivoStorage
        }
        
        axios.post("http://localhost:3000/meus-produtos/cadastrar-produto", objeto)
        .then(() => {
          navigate("/inicio")
        })
        .catch((error) => {
            console.log(error)
        })
    }
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
                <h2>Cadastrar produto </h2>
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

        <Centralizador>
        <FormularioCadastro>
          <FormularioTitulo>Cadastrar Produto</FormularioTitulo>
          <Formulario>
            <CampoFormulario>
              <LabelFormulario htmlFor="nomeProduto">Nome do Produto</LabelFormulario>
              <InputFormulario type="text" id="nomeProduto" placeholder="Digite o nome do produto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
            </CampoFormulario>

            <CampoFormulario>
              <LabelFormulario htmlFor="quantidadeEstoque">Quantidade em Estoque</LabelFormulario>
              <InputFormulario type="number" id="quantidadeEstoque" placeholder="Digite a quantidade" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(e.target.value.replace(/[^0-9]/g, ""))} />
            </CampoFormulario>

            <CampoFormulario>
              <LabelFormulario htmlFor="valorUnitario">Valor Unitário</LabelFormulario>
              <InputFormulario
                type="text"
                id="valorUnitario"
                placeholder="Digite o valor unitário"
                value={valorUnitario}
                onChange={(e) => setValorUnitario(e.target.value.replace(/[^0-9,]|(?<=,)\d{3,}/g, ''))}
                />
            </CampoFormulario>

            <Finalizador>
                <main>
                    <h3>Selecione a foto do produto</h3>
                    <label htmlFor="inputFile">
                    {fotoProduto ? (
                        <img src={fotoProduto} alt="Imagem Selecionada" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                    ) : (
                        <AiFillFileAdd size={40} />
                    )}
                    </label>
                    <input type="file" id="inputFile" onChange={handleFileChange} />
                </main>
                </Finalizador>
                {campoVazio && <p style={{color: "red", textAlign: "center"}}>Preencha todos os campos</p>}
                {recarregar && <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}> <ThreeDots height="100" width="80" radius="9" color="black" ariaLabel="loading" /> </div>}
                {arquivoStorage && <BotaoCadastrar onClick={(e) => cadastrarProduto(e)} type="button">Cadastrar Produto</BotaoCadastrar>}
          </Formulario>
        </FormularioCadastro>
      </Centralizador>
    </>
  );
};


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
  input {
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 16px;

    @media (max-width: 500px) {
      font-size: 14px;
      width: 100%;
    }
  }
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
  margin: 50px auto;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-sizing: border-box;
`

const FormularioCadastro = styled.div`
    width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const FormularioTitulo = styled.h2`
  color: #333;
  margin-bottom: 20px;
  letter-spacing: 3px;
  box-sizing: border-box;
`;

const Formulario = styled.form`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
`;

const CampoFormulario = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;

const LabelFormulario = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  color: #555;
  box-sizing: border-box;
`;

const InputFormulario = styled.input`
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
`;

const BotaoCadastrar = styled.button`
  background-color: #412CC5;
  color: #fff;
  padding: 10px;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const Finalizador = styled.main`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h3 {
            margin: 0;
            text-align: center;
            color: #555;
        }
        input {
            display: none;
        }

        label {
            text-align: center;
            border: 1.5px dashed #412CC5;
            padding: 15px 0;
            background-color: #FFF;
            cursor: pointer;
        }
    }
`

export default PaginaCriarProduto;
