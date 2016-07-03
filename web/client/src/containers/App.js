import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from "./Header"
import Footer from "../components/Footer"

class App extends Component {
    render() {
        return (
            <div className=''>
                <Header />
                {this.props.children}
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(App)