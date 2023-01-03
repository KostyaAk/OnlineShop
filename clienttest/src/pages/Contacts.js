import React from 'react'
import { Container } from 'react-bootstrap'
const Contacts = () => {
    return (
        <Container>
            <h3>Phone numbers:
                <ul>
                    <li>+ 375 (44) 123-45-67 (А1)</li>
                    <li>+ 375 (29) 890-12-34 (МТС)</li>
                    <li>+ 375 (25) 567-89-01 (Life)</li>
                </ul>
            </h3>
            <h3>Adresses:
                <ul>
                    <li>пр-т Независимости 168/2</li>
                    <li>пр-т Машерова 25</li>
                    <li>пр-т Держинского 122</li>
                </ul>
            </h3>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abba179d7ad9d039188cb4eb3b6716f36f0c22cff29ea676729cb6049f324c40e&amp;source=constructor" width="800" height="400" frameborder="0"></iframe>
        </Container>
    )
}

export default Contacts
