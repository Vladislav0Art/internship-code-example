import { REGISTER_MODAL_OPEN, REGISTER_MODAL_CLOSE, LOGIN_MODAL_OPEN, LOGIN_MODAL_CLOSE } from "../reduces/types";


function openRegisterModal() {
  return {
    type: REGISTER_MODAL_OPEN
  }
}

function closeRegisterModal() {
  return {
    type: REGISTER_MODAL_CLOSE
  }
}

function openLoginModal() {
  return {
    type: LOGIN_MODAL_OPEN
  }
}

function closeLoginModal() {
  return {
    type: LOGIN_MODAL_CLOSE
  }
}



export default {
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal
}