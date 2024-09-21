import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/apiCalls/users';
import UsersTableComp from '../components/UsersTableComp';
import { clearUsers } from '../redux/UseersComponentRedux';



const Container = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F4F5F7;
    box-sizing: border-box;
`
const Wrapper = styled.div`
    width: 1200px;
    max-width: 90%;
`
const Title = styled.h1`
    font-size: 1.25rem;
`
const FilterSection = styled.form`
    max-width: 100%;
    display: flex;
    padding: 1.5rem 1rem;
    background-color: white;
    box-sizing: border-box;
    gap: 0.5rem;
    border-radius: 1vmin;

    @media (max-width: 650px) {
        flex-direction: column;
    }

    > * {
        background-color: #F4F5F7;
        border: #F4F5F7 1px solid;
        border-radius: 1vmin;
        padding: 1rem 0.8rem; 
    }

    > input:focus {
        background-color: white;
    }
    > select:focus {
        background-color: white;
    }
`
const SearchProduct = styled.input`
    padding: 0.7rem 0.5rem;
    outline: none;
    flex: 3;   
`

const Search = styled.button`
    flex: 1;
    background-color: teal;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    :hover {
        background-color: #02a8a8;
    }
`



function Users() {
    const dispatch = useDispatch()
    const [querie, setquery] = useState()

    const handleS = async(e,{type}) => {     
        if(type === "search") setquery(p => ({...p, s : e.target.value})) 
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(dispatch, querie)
    }
    useEffect(()=>{
        fetchUsers(dispatch, querie);  
        return () => {
            dispatch(clearUsers())
        }
    },[])


    //add product
  return (
    <Container>
        <Title>Users</Title>
        <Wrapper>
            
            <FilterSection>
                <SearchProduct placeholder='Search by User by name/email/phone/id ' onChange={(e) => handleS(e, {type: "search"})}></SearchProduct>
                <Search type='submit' onClick={handleSearch}>Search</Search>
            </FilterSection>
            <UsersTableComp/>
        </Wrapper>
    </Container>
  )
}

export default Users