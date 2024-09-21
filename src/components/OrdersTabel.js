import styled from 'styled-components'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { req } from '../axiosReqMethods';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/MessageRedux';
import { useNavigate } from 'react-router-dom'

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
    padding: 0.60rem 1rem;
    vertical-align: middle;
    margin-top: auto;

    > svg{
        color: rgb(171,171,171);
        :hover {
            color: rgb(130,130,130);
        }
    }
`
const Tr = styled.tr`
    border-bottom: 1px solid #d5d6d7;

`


//status//
const statusColors = {
    pending: { background: "FDF6B2", color: "C6783B" },
    processing: { background: "DEF7EC", color: "87A66E" },
    delivered: { background: "E1EFFE", color: "3F91FA" }
};  
const Status = styled.p`
    font-weight: 500;
    margin: 0;
    text-align: center;
    border-radius: 50px;
    background-color: #${({ status }) => statusColors[status]?.background};
    color: #${({ status }) => statusColors[status]?.color};
`;
//status END//

const Select = styled.select`
    height: 2rem;
    border-radius: 0.5vmin;
    border: 1px solid lightgrey;
    background-color: #F9FAFB;
    padding: 0 0.5rem;
`
const Options = styled.option`
    
`

function OrdersTabel({orders, setOrders}) {
    const navigate = useNavigate()
const dispatch = useDispatch();

const handleStateChange = async (id, e) => {
    const { value } = e.target;
    try {
        const {data} = await req.put(`/api/orders/status/${id}`, {status: value})
        dispatch(setError(data.message))
        setOrders(p => p.map((o) => {
            if(o._id === id) {
                return {...o, orderStatus: value}
            }
            return o;
        }))
    } catch (error) {
        dispatch(setError(error.response.data.message))
    }

}
  return ( <>
    <TableWrapper>
        <Table>
            <Thead>
                <tr>
                    <Td>Order ID</Td>
                    <Td>TIME</Td>
                    <Td>SHIPPING ADDRESS</Td>
                    <Td>PHONE</Td>
                    <Td>AMOUNT</Td>
                    <Td>STATUS</Td>
                    <Td>ACTION</Td>
                    <Td>INVOICE</Td>
                </tr>
                
            </Thead>
            <Tbody>
                {orders?.map((o) => {
                    return <Tr key={o._id}>
                        <Td><ContentCopyIcon onClick={() => navigator.clipboard.writeText(o._id)}/></Td>
                        <Td>{new Date(o.createdAt).toDateString()}</Td>
                        <Td>{`${o.userInfo.address?.city}, ${o.userInfo.address?.state}`}</Td>
                        <Td>{o.userInfo.address.mobile}</Td>
                        <Td>{o.price}</Td>
                        <Td><Status status={o.orderStatus}>{o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)}</Status></Td>
                        <Td>
                            <Select value={o.orderStatus} onChange={(e) => handleStateChange(o._id, e)}>
                                <Options value="pending">Pending</Options>
                                <Options value="processing">Processing</Options>
                                <Options value="delivered">Delivered</Options>
                            </Select>
                        </Td>
                        <Td><RemoveRedEyeOutlinedIcon onClick={() => navigate(`/order/${o._id}`)}/></Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    </TableWrapper>
    </>
    
  )
}

export default OrdersTabel