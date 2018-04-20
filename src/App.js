import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import NavPanel from "./NavPanel.js";
import "whatwg-fetch";
import styled from "react-emotion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  componentDidMount() {
    fetch("/api/dirs")
      .then(
        response => response.json(),
        error => console.log("An error occured.", error)
      )
      .then(json => this.setState(state => ({ contents: json })));
  }

  render() {
    const contents = this.state.contents;

    const projectComponents = contents.map(project => (
      <NavPanel
        key={project.title}
        title={project.title}
        contents={project.subs}
      />
    ));

    return (
      <Menu isOpen styles={styles}>
        <LinkDiv id="home" className="menu-item" href="/">
          <div>Home</div>
        </LinkDiv>
        {projectComponents}
      </Menu>
    );
  }
}

const LinkDiv = styled("a")`
  padding: 10px 15px;
  border-bottom: 1px solid #ffffff;
  font-family: Arial;
  color: #d4d3d3;


  &:hover {
    text-decoration: none;
    color: #666666;
  }

  &:active {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
`;

const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "20px",
    height: "20px",
    left: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenu: {
    background: "#373a47",
    paddingTop: "2.5em",
    fontSize: "1.15em",
    margin: "0"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

export default App;
