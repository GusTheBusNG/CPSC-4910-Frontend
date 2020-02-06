import React from 'react';
import HeaderBar from '../../components/headerbar/'

class Home extends React.Component {
  render() {
    return (
      <h1>Home</h1>
    )
  }
}

class AboutMe extends React.Component {
  render() {
    return (
      <h1> AboutMe </h1>
    )
  }
}

class Contact extends React.Component {
  render() {
    return (
      <ul>
        <li>Click to reveal email </li>
      </ul>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
      </head>
    );
  }
}
class HomePage extends React.Component {
  render() {
    return (
        <Header/>,
        <HeaderBar/>,
        <div>
          <HeaderBar/>
        </div>
    );
  }
}

export default HomePage;
