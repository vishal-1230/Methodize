import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import "../../css/Navbar.css";
import { RiMenuFoldLine, RiMenuFill } from "react-icons/ri";

import { Context as TeamContext } from "../../context/store/TeamStore";
import { Modal } from "@material-ui/core";
import TeamForm from "../Forms/TeamForm";
const LeftNavBar = ({ showSidebar, sidebar }) => {
  // const [teams, setTeams] = useState([]);
  const [teamState] = useContext(TeamContext);
  const [open, setOpen] = useState(false);

  //NOTE : Only other option that worked was setting state either in here or in App.js and call it for global state. ReducerContext does not work

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const orderedList = teamState.teams.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const renderedList = orderedList.map((team, i) => {
    return (
      <NavLink
        className="left-nav-bar-team-link"
        style={{ textDecoration: "none", color: "white" }}
        to={`/team/${team.id}/${team.name}`}
        activeClassName="navlink--active"
        key={i}
      >
        <div>{team.name}</div>
      </NavLink>
    );
  });

  const modalBody = (
    <div className="modal-container">
      <TeamForm clickClose={closeModal} open={open}></TeamForm>
    </div>
  );
  return (
    <div>
      <div className="left-nav-bar-container">
        <div className={sidebar ? "nav-menu active" : "nav-menu collapsed"}>
          <div className="left-nav-menu-container">
            <div
              className="left-nav-menu-top"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              <div className="logo" style={{ color: "white" }}>
                Logo Here
              </div>
              <div className="collapse-menu-icon-container">
                <RiMenuFoldLine
                  style={{
                    color: "white",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={showSidebar}
                />
              </div>
            </div>

            <div
              className="main-menu-items-container"
              style={{ marginTop: "10px" }}
            >
              <NavLink
                exact
                to="/"
                className="left-nav-bar-main-link"
                activeClassName="navlink--active"
              >
                <div>Home</div>
              </NavLink>
              <NavLink
                to="/tasks"
                className="left-nav-bar-main-link"
                activeClassName="navlink--active"
              >
                <div>My Tasks</div>
              </NavLink>
            </div>
            {/* <div className="favorites-container">
            <p style={{}}>Favorites</p>

            <li>Favorite 1</li>
            <li>Favorite 2</li>
          </div> */}
            <div className="teams-items-container">
              <div className="teams-items-header" style={{ display: "flex" }}>
                <p style={{}}>Teams</p>
                <p
                  style={{ marginLeft: "140px", cursor: "pointer" }}
                  onClick={openModal}
                >
                  +
                </p>
              </div>
              {teamState.teams ? renderedList : <div>Loading...</div>}
            </div>
          </div>
        </div>

        {sidebar ? null : (
          <div
            className="menu-icon"
            style={{
              paddingTop: "25px",
              paddingLeft: "20px",
              paddingBottom: "22px",
              backgroundColor: "white",
            }}
          >
            <RiMenuFill
              style={{
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={showSidebar}
            />
          </div>
        )}
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default LeftNavBar;
