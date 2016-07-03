import React, {PropTypes, Component} from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="footer-top-at">

                        <div className="col-md-4 amet-sed">
                            <h4>MORE INFO</h4>
                            <ul className="nav-bottom">
                                <li><a href="#">How to order</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="contact.html">Location</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Membership</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 amet-sed ">
                            <h4>CONTACT US</h4>

                            <p>
                                Contrary to popular belief</p>

                            <p>The standard chunk</p>

                            <p>office: +12 34 995 0792</p>
                            <ul className="social">
                                <li><a href="#"><i> </i></a></li>
                                <li><a href="#"><i className="twitter"> </i></a></li>
                                <li><a href="#"><i className="rss"> </i></a></li>
                                <li><a href="#"><i className="gmail"> </i></a></li>

                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="footer-class">
                    <p>© 2015 New store All Rights Reserved</p>
                </div>
            </div>
        )
    }
}
