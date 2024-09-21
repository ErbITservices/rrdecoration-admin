import {useState, useEffect} from 'react'
import EditModal from './EditModal'
import styled from 'styled-components'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { updateUser } from '../redux/apiCalls/users';
import { useDispatch } from 'react-redux';


const Container = styled.div`
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  @media (max-width: 800px) { //added this bza left side was overflowing
    margin-left: 1em;
  }
`
const Section = styled.div`
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`
const Left = styled.div`
  flex: 1;

`
const Right = styled.div`
  flex: 2;

  > input, select {
    box-sizing: border-box;
    width: 100%;
    padding: 0.9rem 0.5rem;
    background-color: #F4F5F7;
    border: 1px rgb(229,231,235) solid;
    border-radius: 1vmin;
    font-size: 1.1rem;
    outline: none;

    :focus  {
      background-color: white;
    }
  }
`
const UploadImage = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  padding: 1rem;

  > svg {
    color: teal;
  }
`
const UploadTitle = styled.span`

`
const UploadDesc = styled.p`
  font-size: 0.7rem;
`




function EditUser({isOpen, setIsOpen, EditUserInfo, title, desc, action}) {
  const DefaultValues = {firstName:"", lastName:"", email:"", phone:"", number:"", isAdmin: false}

  const [User, setUser] = useState(DefaultValues)

  useEffect(() => {
    if(!EditUserInfo) return 
    setUser({...EditUserInfo})
  }, [EditUserInfo])

  const handleChange = (e) => {
    const { name, value} = e.target;
    setUser((p) => ({...p, [name] :  value}))
  }

  const dispatch = useDispatch()
  const handleSubmit = async () => {

    if(!EditUserInfo) return
    const {resetPasswordExpire,createdAt,_id , ...others} = User;
    await updateUser(dispatch, User._id, others)
    
    setIsOpen(false)
  }

  return (
    <EditModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleSubmit} title={title} desc={desc}>
              <Container>
          <Section>
            <Left>
              <label>User Image</label>
            </Left>
            <Right>
              <UploadImage>
                <CloudUploadOutlinedIcon/>
                <UploadTitle>Drag your image here</UploadTitle>
                <UploadDesc>(Only *.jpeg and *.png images will be accepted)</UploadDesc>
              </UploadImage>
            </Right>
          </Section>

           <Section>
            <Left><label>First name</label></Left>
            <Right><input name="firstName" value={User?.firstName} onChange={e => handleChange(e)}/></Right>
          </Section>

          <Section>
            <Left><label>Last name</label></Left>
            <Right><input name="lastName" value={User?.lastName} onChange={e => handleChange(e)}/></Right>
          </Section>


          <Section>
            <Left><label>Email</label></Left>
            <Right><input name="email" value={User?.email} onChange={e => handleChange(e)}/></Right>
          </Section>

          <Section>
            <Left><label>Number</label></Left>
            <Right><input name="number" value={User?.number} onChange={e => handleChange(e)}/></Right>
          </Section>

          <Section>
            <Left><label>IsAdmin</label></Left>
            <Right>
              <select onChange={e => setUser(p => ({...p, isAdmin: (e.target.value === "true")}))}> {/* used === because i wanted to convert string "true" to boolean true  */}
                <option defaultValue value={false}>User</option>
                <option value={true}>Admin</option>
              </select>
            </Right>
          </Section>
          
        </Container>
    </EditModal>
  )
}

export default EditUser