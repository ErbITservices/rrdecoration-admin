import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import EditUser from '../components/EditUser'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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
const IsAdmin = styled.div`
    color: ${p => p.value ? "green" : "red"};
`

function UsersTableComp() {
    const data = useSelector(state => state.users);
    const users = data.fetchedUsers;
    console.log()


    //edit user
    const [isOpen, setIsOpen] = useState(false)
    const [EditUserInfo, setEditUserInfo] = useState(null)

    const handleEdit = () => {
        console.log("i am action")
    }

  return ( <>
    <TableWrapper>
        <Table>
            <Thead>
                <tr>
                    <Td>ID</Td>
                    <Td>JOINING DATE</Td>
                    <Td>NAME</Td>
                    <Td>EMAIL</Td>
                    <Td>PURCHASED</Td>
                    <Td>isAdmin</Td>
                    <Td>ACTIONS</Td>
                </tr>
                
            </Thead>
            <Tbody>
                {users?.map((u) => {
                    return <Tr key={u._id}>
                        <Td>
                            <div>
                                <ContentCopyIcon onClick={() => navigator.clipboard.writeText(u?._id)}/>                 
                            </div>
                        </Td>
                        <Td>{new Date(u.createdAt).toDateString()}</Td>
                        <Td>{`${u.firstName} ${u.lastName}`}</Td>
                        <Td>{u.email}</Td>
                        <Td>{u?.purchasedProducts?.length}</Td>
                        <Td><IsAdmin value={u.isAdmin}>{JSON.stringify(u.isAdmin)}</IsAdmin></Td>
                        <Td>
                            <div>
                                <EditIcon onClick={() => {setEditUserInfo(u); setIsOpen(true)}} /><DeleteIcon/>
                            </div>
                        </Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    </TableWrapper>
    <EditUser EditUserInfo={EditUserInfo} isOpen={isOpen} setIsOpen={setIsOpen} action={handleEdit} title="Edit user" desc="Updated necessary information of Users from here"/>
    </>
    
  )
}

export default UsersTableComp