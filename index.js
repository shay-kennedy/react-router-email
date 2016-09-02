var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var EMAILS = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}


var Inbox = function(props) {
    return(
        <div>
            <p>From: {props.from}</p>
            <p>To: {props.to}</p>
            <p>Title: {props.title}</p>
            <p>{props.content}</p> 

        </div>
        );

}

var Spam = function(props) {
    return(
         <div>
            <p>From: {props.from}</p>
            <p>To: {props.to}</p>
            <p>Title: {props.title}</p>
            <p>{props.content}</p> 

        </div>
        );
}


var InboxList = function(props) {
    var emails = Object.keys(props.inbox).map(function(emailId, index) {
        var email = props.inbox[emailId];
        return (
           <div>
                <Inbox id={email.id}
                from={email.from}
                to={email.to}
                title={email.title}
                content={email.content}
                key={index} />
           </div>
        );
    });
    return (
        <div>
            {emails}
        </div>
    );
};


var SpamList = function(props) {
    var spams = Object.keys(props.spam).map(function(spamId, index) {
        var spam = props.spam[spamId];
        return (
           <div>
                <Inbox id={spam.id}
                from={spam.from}
                to={spam.to}
                title={spam.title}
                content={spam.content}
                key={index} />
           </div>
        );
    });
    return (
        <div>
            {spams}
        </div>
    );
};



var InboxListContainer = function() {
    
    return <InboxList  inbox={EMAILS.inbox} />

};

var SpamListContainer = function() {
    
    return <SpamList spam={EMAILS.spam} />

};





var App = function(props) {
    return (
        <div>
            <h1>
                Email App
            </h1>
            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/emails" component={App}>
            <IndexRoute component={InboxListContainer} />
            <Route path=":emailId" component={InboxListContainer} />
        </Route>
        <Route path="/spam" component={App}>
            <IndexRoute component={SpamListContainer} />
            <Route path=":spamId" component={SpamListContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});




