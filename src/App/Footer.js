import React from 'react'
import { Card } from 'elemental'
import { styles } from 'refire-app'

const Footer = ({ styles }) => (
  <Card className={styles.container}>
    &nbsp;
  </Card>
)

const css = {
  container: {
    textAlign: "center",
  },
}

export default styles(css, Footer)
