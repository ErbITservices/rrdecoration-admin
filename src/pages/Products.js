import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { req } from '../axiosReqMethods'
import ProductsComp from '../components/ProductsComp'
import { setProducts } from '../redux/Products'
import { useDispatch } from 'react-redux';
import EditProduct from '../components/EditProducts';
import axios from 'axios';


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
const FilterSection = styled.div`
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
const AddProduct = styled.button`
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



function Products() {
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const [querie, setquery] = useState()

    const handleS = async(e,{type}) => {     
        if(type === "cat") setquery(p => ({...p, category : e.target.value}))
        if(type === "sort") setquery(p => ({...p, sort : e.target.value}))
        if(type === "search") setquery(p => ({...p, s : e.target.value})) 
    }

    useEffect(() => {
        (async() => {
            try {     
                let url = `/api/products/allinfo?limit=100&${new URLSearchParams(querie)}`
                const { data } = await req.get(url)
                dispatch(setProducts(data))
            } catch (error) {
                if(axios.isCancel(error)) return
                console.log(error)
            }  
        })()
    },[querie])


    //add product
    const [EditIsOpen, setEditIsOpen] = useState(false)
    
  return (
    <Container>
      <Title>Products</Title>
      <Wrapper>
        <FilterSection>
          <SearchProduct
            placeholder="Search by product name"
            onChange={(e) => handleS(e, { type: "search" })}
          ></SearchProduct>
          <Sections onChange={(e) => handleS(e, { type: "cat" })}>
            <Options value="" default>
              category
            </Options>
            <Options>MOUSE&KEYBORD</Options>
            <Options>STORAGEDEVICE</Options>
            <Options>BOOK</Options>
            <Options>CABLE</Options>
            <Options>ROUTER</Options>
            <Options>PRINTER_MATERIAL</Options>
            <Options>LAMINATOR</Options>
            <Options>SCANNER</Options>
            <Options>STATIONERY</Options>
            <Options>SPEAKER</Options>
            <Options>CCTVCAMERA</Options>
            <Options>OTHER</Options>
          </Sections>
          <Sections onChange={(e) => handleS(e, { type: "sort" })}>
            <Options value="" default>
              Price sort
            </Options>
            <Options value="price-asc">Low to high</Options>
            <Options value="price-desc">High to low</Options>
          </Sections>
          <AddProduct onClick={() => setEditIsOpen(true)}>
            <AddIcon /> Add Product
          </AddProduct>
        </FilterSection>
        <ProductsComp />
      </Wrapper>
      <EditProduct
        isOpen={EditIsOpen}
        setIsOpen={setEditIsOpen}
        editProduct={false}
        title="Add Product"
        desc="Add your product's information from here"
      />
    </Container>
  );
}

export default Products