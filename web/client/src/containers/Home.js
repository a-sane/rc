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
                                        <img className="img-responsive" src="images/pi.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>T-Shirt</span>
                                            </h3>
                                        </div>
                                    </Link>
                                    <p><Link to="/item">Contrary to popular</Link></p>
                                </div>
                                <div className="col-md-4 grid-top">
                                    <a href="single.html" className="b-link-stripe b-animate-go  thickbox"><img className="img-responsive" src="images/pi1.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>Shoe</span>
                                            </h3>
                                        </div>
                                    </a>
                                    <p><a href="single.html">classical Latin</a></p>
                                </div>
                                <div className="col-md-4 grid-top">
                                    <a href="single.html" className="b-link-stripe b-animate-go  thickbox"><img className="img-responsive" src="images/pi2.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>Bag</span>
                                            </h3>
                                        </div>
                                    </a>
                                    <p><a href="single.html">undoubtable</a></p>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                            <div className="grid-in">
                                <div className="col-md-4 grid-top">
                                    <a href="single.html" className="b-link-stripe b-animate-go  thickbox"><img className="img-responsive" src="images/pi3.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>Shirt</span>
                                            </h3>
                                        </div>
                                    </a>
                                    <p><a href="single.html">suffered alteration</a></p>
                                </div>
                                <div className="col-md-4 grid-top">
                                    <a href="single.html" className="b-link-stripe b-animate-go  thickbox"><img className="img-responsive" src="images/pi4.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>Bag</span>
                                            </h3>
                                        </div>
                                    </a>
                                    <p><a href="single.html">Content here</a></p>
                                </div>
                                <div className="col-md-4 grid-top">
                                    <a href="single.html" className="b-link-stripe b-animate-go  thickbox"><img className="img-responsive" src="images/pi5.jpg" alt="" />
                                        <div className="b-wrapper">
                                            <h3 className="b-animate b-from-left    b-delay03 ">
                                                <span>Shoe</span>
                                            </h3>
                                        </div>
                                    </a>
                                    <p><a href="single.html">readable content</a></p>
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