import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import GetAddress from './GetAddress';
import AddressList from './AddressList'

class UserBounties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            balance: "",
            activeBounties: "",
            completedBounties: ""
        }
    }

    // On startup, fetch user balance, etc.
    componentDidMount() {
        this.getBalance();
    }

    getBalance =() => {
        let request = fetch("fetchURL");
        request.then(res => res.json())
            .then(resText => {
                    this.setState({
                        balance: resText.balance
                    });
                }
            ).catch(error => {
                alert("balance did not load properly");
        });
    };

    /*
    // update start to the value returned by the Select component
    handleUpdateStart = (newStart) => {
        this.setState({start: newStart})
    };

    // Update end to the value returned by the Select component
    handleUpdateEnd = (newEnd) => {
        this.setState({end: newEnd})
    };
    */

    /*
    // if clear is clicked, resets edges so it can be cleared
    handleClear = () => {
        this.setState({start: "", end: ""});
    };
    */

    render() {
        return (
            <div className="field">
                <h1> Balance </h1>
                <p> {this.state.balance} sat </p>
                <Divider />
                <br />
                <h1> Deposit </h1>
                <GetAddress />
                <AddressList />
                <Divider />
            </div>
        );
    }
}

export default UserBounties;