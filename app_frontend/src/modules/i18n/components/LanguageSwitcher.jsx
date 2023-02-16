import React from "react"
import { AppLanguage } from "../../../lib"
import { NavLink, useLocation } from "react-router-dom"
import { useIntl } from "react-intl"
import { list, link } from "../../../theme"
import { css } from "aphrodite/no-important"

import { appStrings } from "../../i18n"

export const LanguageSwitcher = () => {
  const { pathname } = useLocation()
  const { messages } = useIntl()

  function getMatchingRoute(language) {
    /**
     * Get the key of the route the user is currently on
     */
    const route = pathname.substring(3) // remove local part '/en' from the pathname /en/contact
    const routeKey = Object.keys(messages).find(key => messages[key] === route)

    /**
     * Find the matching route for the new language
     */
     console.log(appStrings[language])
    const matchingRoute = appStrings[language][routeKey]

    /**
     * Return localized route
     */
    return `/${language}` + matchingRoute
  }

  return (
    <ul className={css(list.container)}>
      {Object.keys(AppLanguage).map(lang => (
        <li key={lang} className={css(list.item)}>
          <NavLink
            className={css(link.primary)}
            activeClassName={css(link.active)}
            to={getMatchingRoute(AppLanguage[lang])}
          >
            {AppLanguage[lang]}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
