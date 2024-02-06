'use client'
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import styles from './DropDown.module.scss'
import Link from 'next/link';

const UserDropdown = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.userDropdown}>
      <div className={styles.userButton} onClick={toggleDropdown}>
        <Avatar>{username[0]}</Avatar>
        
        <span>{username}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link className={styles.option}  href='/user-profile'>Editar Perfil</Link>
          <div className={styles.option} onClick={onLogout}>Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
