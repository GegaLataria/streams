import React from "react";

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '155006371468-h0c79k1br0aiosqmceq21cep99hsf0jq.apps.googleusercontent.com',
                scope: 'email',
                plugin_name:'Streamy'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState( {isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn:this.auth.isSignedIn.get() });     
    };

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null;
        }else if(this.state.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOut}>
                    <i className="google icon" />
                        Sign Out 
                </button>
            );
        }else{
            return (
                <button className="ui red google button" onClick={this.onSignIn}>
                    <i className="google icon" />
                        Sign In with Google
                </button>
            );
        }
    }

    onSignIn = () =>{
        this.auth.signIn();
    };

    onSignOut = () =>{
        this.auth.signOut();
    };

    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
};

export default GoogleAuth;