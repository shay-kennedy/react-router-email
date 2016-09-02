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
    // I need to know which email the url is pointing to
    console.log(EMAILS.inbox[props.params.inboxId]);
    var email = EMAILS.inbox[props.params.inboxId];
    return(
        <div>
            <p>From: {email.from}</p>
            <p>To: {email.to}</p>
            <p>Title: {email.title}</p>
            <p>{email.content}</p> 

        </div>
        );

}

var Spam = function(props) {
    console.log(EMAILS.spam[props.params.spamId]);
    var spam = EMAILS.spam[props.params.spamId];
    return(
         <div>
            <p>From: {spam.from}</p>
            <p>To: {spam.to}</p>
            <p>Title: {spam.title}</p>
            <p>{spam.content}</p> 

        </div>
        );
}


var InboxList = function(props) {
    var emails = Object.keys(props.inbox).map(function(inboxId, index) {
        var email = props.inbox[inboxId];
        return (
           <div>
           <Link to={'/inbox/' + email.id}> {email.title}</Link>
         
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
                <Link to={'/spam/' + spam.id}> {spam.title}</Link>
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
             <strong>
                <Link to={'/inbox'}>
                    Inbox
                </Link>
            </strong>    
            </div>
            <div>
            <strong>
                <Link to={'/spam'}>
                    Spam
                </Link>
            </strong>          
            </div>

            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/inbox" component={App}>
            <IndexRoute component={InboxListContainer} />
            <Route path=":inboxId" component={Inbox} />
        </Route>
        <Route path="/spam" component={App}>
            <IndexRoute component={SpamListContainer} />
            <Route path=":spamId" component={Spam} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});




