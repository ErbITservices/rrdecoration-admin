import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { req } from "../axiosReqMethods"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';

import TodayIcon from '@mui/icons-material/Today';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const Container = styled.div`

    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const LStatsContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;

    @media only screen and (max-width: 650px) {
        flex-direction: column;
    }

`

const LStats = styled.div`
    box-sizing: border-box;
    flex: 1;
    height: 150px;
    padding: 2rem;
    background-color: #${p => p.color};
    border-radius: 0.5rem;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    >* {
        margin: 0;
    }
    >svg {
        font-size: 2rem;
    }

    >:last-child {
        font-size: 1.5rem;
        font-weight: 500;
    }
    
`

const OrdersStatsContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`

const OrderStats = styled.div`
    flex: 1;
    height: 100px;
    border: 1px solid #E5E7EB;
    background-color: white;
    border-radius: 0.5rem;   
    padding: 1rem;
    display: flex;
    min-width: 250px;

    >:first-child {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        >div {
            width: 50px;
            height: 50px;
            background-color: #${p => p.backColor};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            >svg {
            color: #${p => p.logoColor};
        }
        }

        

    }

    >:last-child {
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;

        >p {
            margin: 0;
        }

        >:first-child {

        }

        >:last-child {
            font-size: 1.5rem;
        }
    }
`

function Stats() {
    const [orderStats, setOrderStats] = useState();
    const [orderPrice, setOrderPrice] = useState();
    
    useEffect(() => {

        (async () => {
            try {   
                const [quantityStats, priceStats] = await Promise.all([
                    req.get("/api/analytics/order"),
                    req.get("/api/analytics/orderprice")
                ])
                
            setOrderStats(quantityStats.data)
                setOrderPrice(priceStats.data)
                console.log(orderPrice[0]);
                console.log("heyf");
                
                if (orderPrice.length === 0 ) {
                    setOrderPrice({ today: "0" });
                    console.log("mihir");
                    
                }
        } catch (error) {
            console.log(error)
        }})()

    }, [])
    

  return (
    <Container>
      {orderPrice ? (
        <LStatsContainer>
          <LStats color="0694A2">
            <TodayIcon />
            <p>Today's Order's</p>
            {/* {orderPrice.length !== 0 && <p>{orderPrice[0].today}</p>} */}
            <p>{orderPrice[0].today}</p>
          </LStats>
          <LStats color="3F83F8">
            <LocalShippingIcon />
            <p>Monthy order's</p>
            {/* {orderPrice.length !== 0 && <p>{orderPrice[0].month}</p>} */}

            <p>{orderPrice[0].month}</p>
          </LStats>
          <LStats color="0E9F6E">
            <AccountBalanceIcon />
            <p>Total Order's</p>
            {/* {orderPrice.length !== 0 && <p>{orderPrice[0].allTime}</p>} */}

            <p>{orderPrice[0].allTime}</p>
          </LStats>
        </LStatsContainer>
      ) : null}

      {orderStats ? (
        <OrdersStatsContainer>
          <OrderStats backColor="FEECDC" logoColor="D03801">
            <div>
              <div>
                <ShoppingCartIcon />
              </div>
            </div>
            <div>
              <p>Total</p>
              <p>
                {orderStats[0].pending +
                  orderStats[0].processing +
                  orderStats[0].delivered}
              </p>
            </div>
          </OrderStats>
          <OrderStats backColor="E1EFFE" logoColor="1C64F2">
            <div>
              <div>
                <AutorenewIcon />
              </div>
            </div>
            <div>
              <p>Order Pending</p>
              <p>{orderStats[0].pending}</p>
            </div>
          </OrderStats>
          <OrderStats backColor="D5F5F6" logoColor="117C88">
            <div>
              <div>
                <LocalShippingIcon />
              </div>
            </div>
            <div>
              <p>Order Processing</p>
              <p>{orderStats[0].processing}</p>
            </div>
          </OrderStats>
          <OrderStats backColor="DEF7EC" logoColor="057A55">
            <div>
              <div>
                <CheckIcon />
              </div>
            </div>
            <div>
              <p>Order Delivered</p>
              <p>{orderStats[0].delivered}</p>
            </div>
          </OrderStats>
        </OrdersStatsContainer>
      ) : null}
    </Container>
  );
}

export default Stats