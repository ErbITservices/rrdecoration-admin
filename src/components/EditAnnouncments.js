import {useState, useEffect} from 'react'
import EditModal from './EditModal'
import styled from 'styled-components'
import { req } from '../axiosReqMethods'
import { setError } from '../redux/MessageRedux'
import { useDispatch } from 'react-redux'
import { addannouncements, editAnnoucment } from '../redux/AnnoucmentRedux'


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

const Textarea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    resize: vertical;
    padding: 0.9rem 0.5rem;
    background-color: #F4F5F7;
    border: 1px rgb(229,231,235) solid;
    border-radius: 1vmin;
    font-size: 1.1rem;
    outline-color: lightblue;
`


function EditAnnouncments({isOpen, setIsOpen, EditAnnouncmentsInfo, title, desc}) {
  const dispatch = useDispatch()
  const DefaultValues = {title:"", active: false}

  const [annoucment, setAnnoucment] = useState(DefaultValues)

  useEffect(() => {
    if(!EditAnnouncmentsInfo)  return
    setAnnoucment({...EditAnnouncmentsInfo}) 
  }, [EditAnnouncmentsInfo])

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "active") value = JSON.parse(value) // parsivg value to json because this is coming like "true" and i want true thats why parsed it to JSON
    setAnnoucment(p => ({...p, [name]: value}))
  }

  const editAnnouncmentApi = async () => {
    try {
      const {data} = await req.put(`/api/announcment/${annoucment._id}`, {title: annoucment.title, active: annoucment.active})
      dispatch(setError(data?.message))
      dispatch(editAnnoucment(annoucment))
    } catch (error) {
      dispatch(setError(error.responce.data.message))
    }
    
  }
  const addAnnouncmentApi = async () => {
    try {
      const {data} = await req.post("/api/announcment", annoucment)
      dispatch(setError(data?.message))
      dispatch(addannouncements(annoucment))
    } catch (error) {
      dispatch(setError(error.responce.data.message))
    }
    
  }
  
  const handleSubmit = () => {
    if(!EditAnnouncmentsInfo){
      addAnnouncmentApi()
    } else {
      editAnnouncmentApi()
    }
    setIsOpen(false)
  }

  return (
    <EditModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleSubmit} title={title} desc={desc}>
        <Container>
            <Section>
                <Left><label>Product Description</label></Left>
                <Right><Textarea name="title" value={annoucment.title} onChange={e => handleChange(e)}/></Right>
            </Section>

            <Section>
                <Left><label>is activated</label></Left>
                <Right>
                <select name="active" value={annoucment.active} onChange={e => handleChange(e)}>
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>
                </Right>
            </Section>
          
        </Container>
    </EditModal>
  )
}

export default EditAnnouncments