import React from "react"
import { NavLink } from "react-router-dom"
import { AppRoute,  AppRouteTitles } from "../../../lib"
import { defineMessages, defineMessage, useIntl } from "react-intl"
import {FormattedMessage} from 'react-intl'
import { css } from "aphrodite/no-important"
import { list, link } from "../../../theme"

export const Navigation = () => {
  const intl = useIntl()
  
  const localizeRouteKey = (path) => {
    return `/${intl.locale}` + intl.formatMessage({
      id: `${path}`,
      defaultMessage: "Today",
    })
  }

  return (
    <ul className={css(list.container)}>
      {Object.keys(AppRoute).map(elem => (
        <li key={elem} className={css(list.item)}>
          <NavLink
            exact
            className={css(link.primary)}
            activeClassName={css(link.active)}
            to={localizeRouteKey(AppRoute[elem])}
          >
            {intl.formatMessage({ id: AppRouteTitles.get(AppRoute[elem])})}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
