import React from "react";
import { Panel } from "react-bootstrap";
import styled, { css } from "react-emotion";

const NavPanel = ({ title, contents }) => {
  const files = contents.filter(content => !content.hasOwnProperty("subs"));
  const directories = contents.filter(content =>
    content.hasOwnProperty("subs")
  );
  return (
    <Panel id={title} className={panelStyle}>
      <Panel.Toggle>
        <Panel.Heading className={panelHeadingStyle}>
          <Panel.Title>{title}</Panel.Title>
        </Panel.Heading>
      </Panel.Toggle>
      <Panel.Collapse>
        <Panel.Body className={panelBodyStyle}>
          {directories.map(content => (
            <NavPanel
              key={content.title}
              title={content.title}
              contents={content.subs}
            />
          ))}

          {files.map(content => (
            <FilesBody>
              <a href={content.path}>{content.title}</a>
            </FilesBody>
          ))}
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );
};

const panelStyle = css`
  width: 100%;
  border-radius: 0px;
  border: 0px;
  margin-bottom: 0px;
  font-family: Arial;
  background: #d4d3d3;
  a {
    &:hover {
      text-decoration: none;
    }

    &:active {
      text-decoration: none;
    }

    &:visited {
      text-decoration: none;
    }
  }
`;

const panelHeadingStyle = css`
  background: #373a47;
  color: #d4d3d3;
  border-radius: 0px;
  border-bottom: 1px solid #ffffff;

  &:hover {
    color: #666666;
  }
`;

const panelBodyStyle = css`
  padding: 0px 0px 0px 15px;
`;

const FilesBody = styled("div")`
  padding: 10px 0px;
  font-size: 0.8em;

  a {
    color: #666666;

    &:hover {
      text-decoration: none;
      color: #ffffff;
    }
    &:active {
      text-decoration: none;
    }
  }
`;

export default NavPanel;
