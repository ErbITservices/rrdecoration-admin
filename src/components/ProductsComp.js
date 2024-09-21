import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Confirmation from './Confirmation';
import ProductNotFound from './ProductNotFound';
import EditProduct from './EditProducts';
import { useDispatch, useSelector } from 'react-redux';
import { req } from '../axiosReqMethods';
import { deleteProduct } from '../redux/Products';
import { setError } from '../redux/MessageRedux';

const TableWrapper = styled.div`
    margin-top: 20px;   
    overflow: auto;
    border: 1px solid #d5d6d7;
    border-radius: 1vmin;
`
const Table = styled.table`
    width: 100%; 
    min-width: 1000px;   
    border-collapse: collapse;  
    overflow: auto  ;
`
const Thead = styled.thead`
    background-color: teal;
    color: white;
`
const Tbody = styled.tbody`
    background-color: white;

    > :nth-last-child() {
        border-bottom: 2px solid teal;
        background-color: red;
    }
    
`
const Td = styled.td`
    padding: 0.75rem 1rem;
    vertical-align: middle;
    margin-top: auto;

    > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    > svg{
        color: rgb(171,171,171);

        :hover {
            color: rgb(130,130,130);
        }
    }

    > div > svg {
        color: rgb(171,171,171);
        :hover {
            color: rgb(130,130,130);
        }
    }
`
const Tr = styled.tr`
    border-bottom: 1px solid #d5d6d7;

`
const Image = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-position: center;

`

//cornfirmation style


function ProductsComp() {
    const dispatch = useDispatch()    
    const products = useSelector(p => p.Products.products)
    const [DeleteisOpen, setDeleteIsOpen] = useState(false)
    const [DeleteProductInfo, setDeleteProductInfo] = useState("")

    const HandleDelete = (product) => {
        setDeleteProductInfo(product)
        setDeleteIsOpen(true)
    }
    const DeleProduct = async () => {
        try {
            const {data} = await req.delete(`/api/products/${DeleteProductInfo._id}`)
            dispatch(setError(data.message))
            dispatch(deleteProduct(DeleteProductInfo._id))
        } catch (error) {
            dispatch(setError(error.response.data.message))
        }
        setDeleteIsOpen(false)
    }


    //Edit
    const [EditIsOpen, setEditIsOpen] = useState();
    const [EditProductInfo, setEditProductInfo] = useState();

    const HandleEdit = (product) => {
        console.log(product)
        setEditIsOpen(true) 
        setEditProductInfo(product)
    }
  return (
    <>
    

    
        {products?.length ? <TableWrapper>
             <Table>
            <Thead>
                <tr> 
                    <Td>PRO NO.</Td>
                    <Td>PRODUCT NAME</Td>
                    <Td>CATEGORY</Td>
                    <Td>PRICE</Td>
                    <Td>STOCK</Td>
                    <Td>PURCHASED</Td>
                    <Td>DETAILS</Td>
                    <Td>ACTIONS</Td>
                </tr>
            </Thead>
            <Tbody>
                {products?.map((p) => {
                    return <Tr key={p?._id}>
                        
                        <Td>
                            <div>
                            <ContentCopyIcon onClick={() => navigator.clipboard.writeText(p?._id)}/>
                            {p?.productno}                          
                            </div>
                        </Td>
                        <Td>
                            <div>
                                <Image src={p.img} />
                                {p?.title?.length > 50 ? `${p.title.slice(0, 50)}...` : p?.title}
                            </div>
                        </Td>
                        <Td>{p?.categories ? p?.categories[0] : ""}</Td>
                        <Td>{p?.price}</Td>
                        <Td>{p?.quantity}</Td>
                        <Td>{p?.purchasedCount}</Td>
                        <Td>DETAILS</Td>
                        <Td>
                            <div>
                                <RemoveRedEyeOutlinedIcon onClick={() => window.open(`${process.env.REACT_APP_MAIN_SITE_URL}/product/${p?._id}`, "_blank")}/>
                                <EditIcon onClick={() => HandleEdit(p)} />
                                <DeleteIcon onClick={() => HandleDelete(p)}/>
                            </div>
                        </Td>
                    </Tr>
                })}
            </Tbody>
        </Table> 
        </TableWrapper>: <ProductNotFound/>}

        <Confirmation isOpen={DeleteisOpen} setIsOpen={setDeleteIsOpen} action={DeleProduct} >
            <div style={{display: "flex", flexDirection:"column", textAlign: "center", gap: "0.5rem"}} >
                <b>Are You Sure! Want to Delete <span style={{color: "red"}}>{DeleteProductInfo.title}</span> Record?</b>
                <span>Do you really want to delete these records? You can't view this in your list anymore if you delete!</span>
            </div>
        </Confirmation>
        <EditProduct isOpen={EditIsOpen} setIsOpen={setEditIsOpen} EditProductInfo={EditProductInfo} title="Update Product" desc="Updated your product and necessary information from here"/>
    </>
  )
}

export default ProductsComp