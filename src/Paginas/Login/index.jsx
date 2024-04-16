import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Modal from "../../Componentes/Modal";
import NameContext from "../../context";

const PaginaLogin = () => {
    const { setData } = useContext(NameContext)

    const fullText = "Se você ainda não possui uma conta";
    const [index, setIndex] = useState(0);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (newIndex === fullText.length) {
                    setShowSignUp(true);
                }
                return newIndex;
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    const displayedText = fullText.slice(0, index);
    const blinkingCursor = index < fullText.length ? '|' : '';

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [campoVazio, setCampoVazio] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    
    function entrar () {
        if(email == "" || senha == "") {
          setCampoVazio(true)
        } else {
          const objeto = {email: email, senha: senha}
          axios.post("http://localhost:3000/entrar", objeto)
          .then((r) => {
            setData(r.data)
            navigate("/inicio")
          })
          .catch((erro) => {
            setError(true)
          })
        }
    }

    return (
        <>
            <HeaderEstilizada>
                <h1>Pedro</h1>
                <h1>Shop</h1>
            </HeaderEstilizada>
            <Container>
                <FormContainer>
                    <Input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <Button  onClick={() => entrar()}>Entrar</Button>
                    {campoVazio && <p style={{color: "red"}}>Preencha todos os campos</p>}
                </FormContainer>
                <TextContainer>
                    <h3>
                        {displayedText}
                        <BlinkingCursor>{blinkingCursor}</BlinkingCursor>
                    </h3>
                    {showSignUp && <Link style={{textDecoration: "none"}} to="/cadastrar" ><SignUpText>Cadastre-se</SignUpText></Link>}
                </TextContainer>
                {error && <Modal title="Credencias inválidas" message="O email ou a senha estão incorretos" estado={setError} />}
            </Container>
        </>
  );
};

const HeaderEstilizada = styled.header`
    width: 100%;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    display: flex;
    text-transform: uppercase;
    flex-wrap: wrap;
    gap: 15px;
    padding: 20px;
    letter-spacing: 10px;
    :nth-child(1) {
        background-color: black;
        color: white;
        padding: 5px 3px 5px 15px;
    }
`

const Container = styled.main`
    width: 60%;
    box-sizing: border-box;
    margin: 90px auto;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

const Input = styled.input`
  padding: 15px 10px;
  font-size: 16px;
  border: 1px solid #ccc; 
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #412CC5; 
  color: #fff; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const blink = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const BlinkingCursor = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  animation: ${blink} 0.8s infinite;
`;

const signUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SignUpText = styled.h3`
  font-size: 1.5em;
  color: #412CC5;
  cursor: pointer;
  text-transform: uppercase;
  opacity: 0;
  animation: ${signUpAnimation} 0.8s ease forwards;
`;
export default PaginaLogin;
