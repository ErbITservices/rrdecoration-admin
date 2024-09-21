import React, { useCallback, useEffect , useRef, useState} from 'react'
import OrdersTabel from '../components/OrdersTabel.js'
import styled from 'styled-components'
import { req } from '../axiosReqMethods.js'
import { setError } from '../redux/MessageRedux.js'
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'




const Container = styled.div`
    padding: 1rem 0;
    min-height: 100vh;
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
    flex: 2;   
`
const Sections = styled.select`
    flex: 1;
`
const Options = styled.option`

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
const LoadMoreBtn = styled.p`
    margin: 1rem auto;
    width: max-content;
    cursor: pointer;
    :hover {
        text-decoration: underline;
        color: teal;
    }
`

 
function Orders() {
    
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)

    const [queries, setQueries] = useState()
    const handleS = (e, {type}) => {
        if(type === "search") setQueries(p => ({...p, [type]: e.target.value}))
        if(type === "status") setQueries(p => ({...p, [type]: e.target.value}))
        if(type === "sort") setQueries(p => ({...p, [type]: e.target.value}))
    } 

     
    const fetch = async (axiosCancelToken) => {
        try {
            const {data} = await req.get(`/api/orders/?page=${page}&${new URLSearchParams(queries)}`, {cancelToken: axiosCancelToken.token})
            setOrders(p => [...p, ...data])
        } catch (error) {
            // if(error.response.status === 404) return  dispatch(setError(error.response.data.message))
            if(axios.isCancel(error)) return setOrders([]) //req canceled by user
            dispatch(setError("failed to fetch orders"))
        }
    }
    useEffect(() => {
        const axiosCancelToken = axios.CancelToken.source()  
        fetch(axiosCancelToken)
        return () => axiosCancelToken.cancel()
    }, [page])

    const search = async (e) => {
        const axiosCancelToken = axios.CancelToken.source()  
        e.preventDefault()
        setPage(1)
        setOrders([])
        fetch(axiosCancelToken)
    }

  return (
<Container>
        <Title>Products</Title>
        <Wrapper>
            
            <FilterSection onSubmit={search}>
                <SearchProduct type="tel" placeholder='Search by customer number' onChange={(e) => handleS(e, {type: "search"})}></SearchProduct>
                <Sections onChange={(e) => handleS(e, {type: "status"})}>
                    <Options hidden>Status</Options>
                    <Options value="pending">Pending</Options>
                    <Options value="processing">Processing</Options>
                    <Options value="delivered">Delivered</Options>
                    <Options value="" >All</Options>
                </Sections>
                <Sections onChange={(e) => handleS(e, {type: "sort"})}>
                    <Options value="" hidden>Sort</Options>
                    <Options value="price-asc">Price Low to high</Options>
                    <Options value="price-desc">Price High to low</Options>
                    <Options value="newest">New Orders</Options>
                    <Options value="oldest">Old Orders (default)</Options>
                </Sections>
                <Search><AddIcon/>Search</Search>
            </FilterSection>
            <OrdersTabel orders={orders} setOrders={setOrders} />
            <LoadMoreBtn onClick={() => setPage(p => p+1)}>Load more</LoadMoreBtn>
        </Wrapper>
    </Container>
  )
}

export default Orders
