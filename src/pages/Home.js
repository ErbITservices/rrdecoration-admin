import React from 'react'
import styled from 'styled-components'
import Stats from '../components/Stats'
import ChartsComponent from '../components/ChartsComponent'



const HomeComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background-color: #F9FAFB;
`

const Wrapper = styled.div`
  width: 1200px;
  max-width: 90%;
  min-height: 100vh;
`



function Home() {
  return (
    <> 
        <HomeComponent>
          <Wrapper>
            <h1>Dashboard Overview</h1>
            <Stats/>
            <ChartsComponent/>
          </Wrapper>
        </HomeComponent>
 
    </>
  )
}

export default Home

