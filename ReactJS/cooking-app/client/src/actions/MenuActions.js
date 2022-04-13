import { OPEN_MENU, CLOSE_MENU } from '../reduces/types';

function openMenu() {
  return {
    type: OPEN_MENU
  }
}

function closeMenu() {
  return {
    type: CLOSE_MENU
  }
}

export default {
  openMenu, 
  closeMenu
}