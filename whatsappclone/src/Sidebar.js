import React from "react"
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src = "https://avatars.githubusercontent.com/u/38310111?v=4"/>
                <div className="sidebar__headerRight">
                  <IconButton>
                    <DonutLargeIcon/>
                  </IconButton>
                  <IconButton>
                    <ChatIcon/>
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon/>
                        <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat/>            
            </div>
        </div>
    )
}

export default Sidebar
