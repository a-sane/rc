import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router'

class Home extends Component {
    render() {
        return (
            <div className=''>
                <div className="content">
                    <div className="container">
                        <div className="content-top">
                            <h1>CARS</h1>
                            <div className="grid-in">
                                <div className="col-md-4 grid-top">
                                    <Link to='/item' className="b-link-stripe b-animate-go  thickbox">
                                        <img className="img-responsive" src="model/car_sample.png" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>RC Car</span>
                                            </h3>
                                        </div>
                                    </Link>
                                    <p><Link to="/item">RC Car</Link></p>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)