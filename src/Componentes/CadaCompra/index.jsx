import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const CadaCompra = ({ compra }) => {

    const navigate = useNavigate("/")

    function detalheCompra () {
        navigate(`/inicio/minhas-compras/${compra.codigoCompra}`)
    }

    return (
        <SectionEstilizada>
            <div>
                <span>NF's : </span>
                <span>{compra.codigoCompra}</span>
            </div>
            <section>
                <h4>Compra realizada com sucesso</h4>
                <button onClick={() => detalheCompra()}>Ver detalhes</button>
            </section>
        </SectionEstilizada>
    )
}

export default CadaCompra

const SectionEstilizada = styled.section`
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    border-radius: 15px;
    div {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 18px;
        :nth-child(2) {
            color: #412CC4;
        }
    }
    section {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 400px) {
            flex-direction: column;
            gap: 20px;
        }
        h4 {
            color: #999;
        }
        button {
            border: none;
            padding: 20px;
            background-color: #412CC4;
            color: white;
            border-radius: 15px;
            cursor: pointer;
        }
    }
`