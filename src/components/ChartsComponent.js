import React, { useEffect } from 'react'
import { useState } from 'react';
import { req } from '../axiosReqMethods';
import BarChart from './Charts/BarChart'
import styled from 'styled-components';
import PieChart from './Charts/PieChart';

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 1rem;
    margin: 2rem 0;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
    }

`


function ChartsComponent() {
    const [sizeColordataSet, setsizeColordataSet] = useState();
    const [topProducts, setTopProducts] =  useState()
    const [topCat, setTopCat] =  useState()
    useEffect(() => {

        (async () => {
            try {            
                const [sizeColot, top, topCatres] = await Promise.all([
                    await req.get('/api/analytics/popularsizecolor'),
                    await req.get('/api/analytics/topproducts/?for=chart'),
                    await req.get('/api/analytics/topcat')
                ])
                setsizeColordataSet(sizeColot.data)
                setTopProducts(top.data)
                setTopCat(topCatres.data)
            } catch (error) {
            }
        })();
    },[])

  return (
    <>
        {sizeColordataSet ? (
            <Container>
                <BarChart data={sizeColordataSet[0].sizes} title="Top Size"/>
                <BarChart data={sizeColordataSet[0].colors}  color={true} title="Top Color"/>
            </Container>
            
        ) : null}

        {(sizeColordataSet && topCat) ? (
            <Container>
                <PieChart data={topProducts} title="Top Products"/>
                <PieChart data={topCat} title="Top categories"/>
            </Container>
            
        ) : null}   
        
    </>
  )
}

export default ChartsComponent