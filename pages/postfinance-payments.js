import React from 'react'
import App from '../components/App'
import {
  Body,
  Content,
  Header
} from '../components/Layout'
import PostfinancePayments from '../components/PostfinancePayments/List'
import { Router } from '../server/routes'

const changeHandler = params => {
  Router.pushRoute('postfinance-payments', params)
}

export default props => {
  return (
    <App>
      <Body>
        <Header />
        <Content id="content">
          <PostfinancePayments
            params={props.url.query}
            onChange={changeHandler}
          />
        </Content>
      </Body>
    </App>
  )
}
