import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';

const Colx = props => {
    return (
        <Col 
        xs={24}
        sm={24}
        md={24}
        lg={props.w}
        xl={props.w}
        >
            {props.children}
        </Col>
    )
}

// Validating props
Colx.propTypes = {
    w: PropTypes.number.isRequired
};

export default Colx;