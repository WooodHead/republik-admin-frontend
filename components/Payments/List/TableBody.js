import React from 'react'
import {
  Table,
  Row,
  Cell
} from '../../Layout/Table'
import { colors } from '@project-r/styleguide'
import { chfFormat } from '../../../lib/utils/formats'
import { css } from 'glamor'
import routes from '../../../server/routes'
const { Link } = routes

const displayDate = rawDate => {
  const date = new Date(rawDate)
  return `${date.getDate()}.${date.getMonth() +
    1}.${date.getFullYear()}`
}

const getDueDate = (status, dueDate) => {
  if (!dueDate) {
    return '-'
  } else if (
    new Date(dueDate) < new Date() &&
    status !== 'PAID'
  ) {
    return (
      <span
        style={{
          color: colors.error,
          fontWeight: 'bold'
        }}
      >
        {displayDate(dueDate)}
      </span>
    )
  }
  return displayDate(dueDate)
}

const rowStyles = index => ({
  maxHeight: '40px',
  backgroundColor:
    index % 2 > 0 ? colors.secondaryBg : 'none'
})

const interactiveStyles = {
  cursor: 'pointer'
}

const link = css({
  textDecoration: 'none',
  color: colors.primary,
  ':visited': {
    color: colors.primary
  },
  ':hover': {
    color: colors.secondary
  }
})

export default ({ items, ...props }) => (
  <Table {...props}>
    {items.map((payment, index) => (
      <Row
        key={`payment-${index}`}
        style={rowStyles(index)}
      >
        <Cell flex="0 0 10%">{payment.hrid}</Cell>
        <Cell flex="0 0 10%">
          {chfFormat(payment.total / 100)}
        </Cell>
        <Cell flex="0 0 20%">
          {payment.status}
        </Cell>
        <Cell flex="0 0 10%">
          {getDueDate(
            payment.status,
            payment.dueDate
          )}
        </Cell>
        <Cell flex="0 0 20%">
          {payment.method}
        </Cell>
        <Cell flex="0 0 10%">
          {displayDate(payment.createdAt)}
        </Cell>
        <Cell flex="0 0 5%">
          {payment.user && (
            <Link
              route="user"
              params={{ userId: payment.user.id }}
            >
              <a
                className={`${link}`}
                style={interactiveStyles}
              >
                Zum User
              </a>
            </Link>
          )}
        </Cell>
      </Row>
    ))}
  </Table>
)
