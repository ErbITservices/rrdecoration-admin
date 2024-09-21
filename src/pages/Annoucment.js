import React from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { req } from '../axiosReqMethods';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAnnouncments from '../components/EditAnnouncments';
import AnnoucmentsTable from '../components/AnnoucmentsTable';
import { setError } from '../redux/MessageRedux';
import { useDispatch, useSelector } from 'react-redux';
import { disableAllAnnoucments, editAnnoucment, fetchannouncements } from '../redux/AnnoucmentRedux';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  justify-content: center;
  background-color: #F0F2F5;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
`
const Title = styled.h1`
  font-size: 2rem;
  color: #444;
  margin-bottom: 1rem;
`
const TopSection = styled.div`
  background-color: #FFF;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`
const AnnouncmentsActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #444;

  >div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
  }
`
const IconContainer = styled.div`
  border: 2px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease-in-out;

  >svg {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    transform: scale(1.1);
    background-color: teal;
    > svg {
      
      color: white;
    }
  }
`

function Annoucment() {
  const dispatch = useDispatch()
  const announcments = useSelector(state => state.announcements.announcements)
  useEffect(() => {
    (async () => {
      const {data} = await req.get("/api/announcment/all")
      dispatch(fetchannouncements(data))
    }
    )()
  }, [])
  

  //add Annoucment
  const [addIsOpen, setAddIsOpen] = useState(false)

  const DeactivateAllAnnoucments = async () => {
    try {
      const {data} = await req.delete("/api/announcment/active")
      dispatch(setError(data.message))
      dispatch(disableAllAnnoucments())
    } catch (error) {
      
    }
    
  }

  return (
    <Container>
      <Wrapper>
        <Title>Announcments</Title>
        <TopSection>
          <AnnouncmentsActions>
            <div>
              <IconContainer onClick={() => setAddIsOpen(true)}><AddIcon/></IconContainer>
              add Announcments
            </div>
            <div>
              <IconContainer onClick={DeactivateAllAnnoucments}><DeleteIcon/></IconContainer>
              Deactivate All Annoucments
            </div>
          </AnnouncmentsActions>

          <AnnoucmentsTable announcments={announcments}/>

        </TopSection>
      </Wrapper>
    <EditAnnouncments isOpen={addIsOpen} setIsOpen={setAddIsOpen} title="Add Annoucment" desc="Add your Annoucment's information from here" />
    </Container>
  )
}

export default Annoucment