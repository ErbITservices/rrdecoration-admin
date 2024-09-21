import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect } from 'react';


const BackDrop = styled.div`
    opacity: ${p => p.isOpen ? "100%" : "0%"};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    transition: right 0.5s ease-in-out;
`

const Container = styled.div`
    z-index: 51;
    position: fixed;
    top: 0;
    right: ${p => p.isOpen ? "0%" : "-100%"};
    width: 50vw;
    height: 100vh;
    background-color: white;  
    transition: right 0.5s ease-in-out;
    @media (max-width: 800px) {
        width: 100vw;
    }
`
const Top = styled.div`
    padding: 1rem 1.5rem;
    display: flex;
    height: 90px;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
    background-color: #F9FAFB;

    
    > h3 {
        margin: 0;
    }
    >p {
        margin: 0;
    }

    > div {
        z-index: 52;
        position: absolute;
        right: 0;
        top: 1.2rem;
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow:0px 0px 30px rgba(0, 0, 0, 0.17);
        :hover {
            background-color: #ffeceb;
        }

        > svg {
            color: red;
        }
    }
`
const Middle = styled.div`
    height: calc(100vh - 170px);
    overflow: auto;
    padding: 0 1.4rem;


    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    scrollbar-width: auto;
    scrollbar-color: #00a8a8 #ffffff;

    /* Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #ffffff;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #00a8a8;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }

`
const Bottom = styled.div`
    position: sticky;
    height: 80px;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F9FAFB;
    padding: 1rem;

    @media (max-width: 800px) {
        width: 100vw;
    }

    > button {
        flex: 1;
        margin: 0 1rem;
        padding: 0.8rem 0;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
    }
`
const CancelBtn = styled.button`
    background-color: #E5E7EB;
    color: red;

    :hover {
        background-color: #F3EDEF;
    }
`
const SubmitBtn = styled.button`
    background-color: teal;
    color: white;

    :hover {
        background-color: #016969;
    }
`



function EditModal({children, isOpen, setIsOpen, title, desc, action}) {

  return ReactDOM.createPortal(
    <>
        {isOpen && <BackDrop isOpen={isOpen}/> }
        <Container isOpen={isOpen}>
            <Top>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <div onClick={() => setIsOpen(false)}><CloseOutlinedIcon/></div>           
            </Top>
            <Middle>
                {children}
            </Middle>
            <Bottom>
                <CancelBtn onClick={() => setIsOpen(false)}>Cancel</CancelBtn>
                <SubmitBtn onClick={action} >{title}</SubmitBtn>
            </Bottom>
            
        </Container>
        
    </>
  , document.getElementById("editModal-root"))
}

export default EditModal