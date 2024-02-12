'use client'
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react';
import styles from './DropDown.module.scss'
import Link from 'next/link';


const UserDropdown = ({ userName,userLastName, onLogout }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  let avatarName ="";
  /*if(userName !== 'undefined' && userLastName !== 'undefined' ){
     avatarName = userName[0] + userLastName[0] || "";
  }*/
  

  let menuRef = useRef();

  useEffect(() => {
      let handler = (e) => {
        if(!menuRef.current.contains(e.target)){
          setIsOpen(false);
        }
        
      };
      document.addEventListener("mousedown", handler);

      return() => {
        document.removeEventListener("mousedown", handler);
      }
  });



  return (
    <div ref={menuRef}>

    <div className={styles.menuTrigger}   onClick={() =>{setIsOpen(!isOpen)} }>
    
      <Avatar className={styles.Avatar} >{avatarName}</Avatar>

      <div className={`${styles.dropDownMenu} ${isOpen? styles.dropDownMenuActive : styles.dropDownMenuInactive }`}>
        <h3 className={styles.userName}>{userName +" "+ userLastName}</h3>
        <ul>
          
          <li className={styles.dropDownItem}>
            <FontAwesomeIcon icon={faUser}/>
            <Link className={styles.option} href= {'/user-profile'} >Editar perfil</Link>
          </li>
    
          <li className={styles.dropDownItem}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
            <a className={styles.option} onClick={onLogout}>Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
    </div>

  );
};

function DropDownItem(props){
  return(
    <li className={styles.dropDownItem}>
      <FontAwesomeIcon icon={props.iconName}/>
      <Link className={styles.option} href= {`${props.referencia}`} onClick={props.inetAction}>{props.text}</Link>
    </li>
  )
}

export default UserDropdown;