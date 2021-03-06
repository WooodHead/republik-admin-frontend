import React, { Component } from 'react'
import {
  Button,
  Overlay,
  OverlayBody,
  OverlayToolbar,
  OverlayToolbarClose,
  Interaction
} from '@project-r/styleguide'
import SearchUser from '../../Form/SearchUser'
import { swissTime } from '../../../lib/utils/formats'

const dateTimeFormat = swissTime.format(
  '%e. %B %Y %H.%M Uhr'
)

export default class MoveMembership extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      user: null
    }

    this.userChangeHandler = ({ value }) => {
      this.setState(() => ({ user: value }))
    }

    this.closeHandler = () => {
      this.setState(() => ({ user: null, isOpen: false }))
    }

    this.submitHandler = () => {
      this.setState(() => ({ user: null, isOpen: false }))
      this.props.onSubmit({
        membershipId: this.props.membership.id,
        userId: this.state.user.id
      })
    }
  }

  render() {
    const { isOpen, user } = this.state
    const { membership } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <Button
          onClick={() => {
            this.setState({ isOpen: true })
          }}
        >
          Move membership
        </Button>

        {isOpen && (
          <Overlay onClose={this.closeHandler}>
            <OverlayToolbar>
              <OverlayToolbarClose
                onClick={this.closeHandler}
              />
            </OverlayToolbar>
            <OverlayBody>
              <Interaction.H2>
                Membership verschieben
              </Interaction.H2>
              <br />
              <Interaction.P>
                #{membership.sequenceNumber} –{' '}
                {membership.type.name.split('_').join(' ')}{' '}
                –{' '}
                {dateTimeFormat(
                  new Date(membership.createdAt)
                )}{' '}
                –{' '}
                {(!!membership.renew && 'ACTIVE') ||
                  'INACTIVE'}
              </Interaction.P>
              {membership.periods.map((period, i) => (
                <span key={`period-${i}`}>
                  {dateTimeFormat(
                    new Date(period.beginDate)
                  )}
                  {' - '}
                  {dateTimeFormat(new Date(period.endDate))}
                </span>
              ))}
              <SearchUser
                label="User auswählen"
                value={user}
                onChange={this.userChangeHandler}
              />
              <Button
                primary
                disabled={!user}
                onClick={this.submitHandler}
              >
                Speichern
              </Button>
            </OverlayBody>
          </Overlay>
        )}
      </div>
    )
  }
}
