import React from 'react';
import { connect } from 'react-redux';
// actions
import ModalActions from '../../actions/ModalActions';
import AuthActions from '../../actions/AuthActions';
import MenuActions from '../../actions/MenuActions';
// components
import { Search, Logo, ServiceButton, Input, Menu, MenuItem, ProfileInfo } from '../../components/index';
import Loader from 'react-loader-spinner';
// modules
import { Modal } from '../index';
// services
import { Notification } from '../../services';
// styles
import './Header.scss';
import './Header-media.scss';


const Header = (props) => {
  // showing errors and messages

  // login msg
  React.useEffect(() => {
    if(!props.state.loginSuccess) return;

    const msg = 'Successfully logged in';
    const type = 'success';
    Notification(msg, type);
  }, [props.state.loginSuccess]);


  // register msg
  React.useEffect(() => {
    if(!props.state.registerSuccess) return;
    
    const msg = 'Successfully registered';
    const type = 'success';
    Notification(msg, type);
  }, [props.state.registerSuccess]);


  // login error
  React.useEffect(() => {
    if(!props.state.loginError) return;

    const msg = props.state.loginError.msg;
    const type = 'error';
    Notification(msg, type);
  }, [props.state.loginError]);

  
  // register error
  React.useEffect(() => {
    if(!props.state.registerError) return;

    const msg = props.state.registerError.msg;
    const type = 'error';
    Notification(msg, type);
  }, [props.state.registerError]);


  // user error
  React.useEffect(() => {
    if(!props.state.userError) return;

    const msg = props.state.userError.msg;
    const type = 'error';
    Notification(msg, type);
  }, [props.state.userError]);


  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__item">
            <Logo
              logoClassNames={[ 'header__logo' ]}
            />
            
            <Search
              searchClassNames={[ 'header__search' ]}
              inputClassNames={[ 'header__input' ]}
              inputPlaceholder="What would you like to cook today?"
              iconClassNames={['header__search-icon']}
              showIcon={true}
            />
          </div>
          
          <div className="header__item">
            {
              props.state.isUserPending ?
                <div className="header__item-loader">
                  <Loader
                    type="Oval"
                    color="#5E5E5E"
                    height={25}
                    width={25}
                  />
                  <p className="message message-info header__item-message">Loading User</p>
                </div>
              :
                null
            }

            { 
              props.state.isUserLoaded ?
                <ProfileInfo user={props.state.user} link="/account" alt="User avatar" />
              :
                null
            }

            {
              !props.state.isUserPending && !props.state.isUserLoaded ?
                  (<React.Fragment>
                    <ServiceButton
                      type="button"
                      content="Register"
                      classNames={[ 'header__btn' ]}
                      onClick={props.openRegisterModal}
        
                    />
                    <ServiceButton
                      type="button"
                      content="Login"
                      classNames={[ 'header__btn' ]}
                      onClick={props.openLoginModal}
                    />
                  </React.Fragment>)
              :
                null
            }

          </div>

          <div className="header__item">
            <div className={`header__burger ${props.state.menuOpen ? 'header__burger-hidden' : ''}`} onClick={props.openMenu}>
              <span className="header__burger-span"></span>
              <span className="header__burger-span"></span>
              <span className="header__burger-span"></span>
            </div>

            <div className={`header__closer ${props.state.menuOpen ? 'header__closer-show' : ''}`} onClick={props.closeMenu}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        </div>

        {
          props.state.menuOpen ? 
            <Menu>
              <MenuItem
                link="/"
                content="All recipes"
                classNames={['mainmenu__item']}
                onClick={props.closeMenu}
              />

              <MenuItem 
                link="/account"
                content="My account"
                classNames={['mainmenu__item']} 
                onClick={props.closeMenu}
              />
              
              <MenuItem 
                link="/create-post"
                content="Create new recipe"
                classNames={['mainmenu__item']} 
                onClick={props.closeMenu}
              />
              
              <MenuItem 
                link="/profile"
                content="Settings"
                classNames={['mainmenu__item']} 
                onClick={props.closeMenu}
              />
            </Menu>
          :
            null
        }
      </div>

      { props.state.registerModalOpen ?
        
        <Modal 
          title="Register"
          closeModal={props.closeRegisterModal} 
          onClick={props.registerUser}
        >
          <div className="modal__group">
            <Input type="text" name="name" placeholder="Enter your name:" required="required" />
          </div>

          <div className="modal__group">
            <Input type="email" name="email" placeholder="Enter your email:" required="required" />
          </div>

          <div className="modal__group">
            <Input type="password" name="password" placeholder="Enter your password:" required="required" />
          </div>

          <div className="modal__group">
            <Input type="password" name="passwordSecond" placeholder="Confirm your password:" required="required" />
          </div>

          { 
            props.state.registerPending ? 
              <Loader
                type="Oval"
                color="#5E5E5E"
                height={30}
                width={30}
              />
            :
              null
          }

        </Modal>

        : null 
      }


      { props.state.loginModalOpen ? 
      
        <Modal
          title="Login" 
          closeModal={props.closeLoginModal} 
          onClick={props.loginUser}
          >
          <div className="modal__group">
            <Input type="email" name="email" placeholder="Enter your email:" required="required" />
          </div>

          <div className="modal__group">
            <Input type="password" name="password" placeholder="Enter your password:" required="required" />
          </div>

          { 
            props.state.loginPending ? 
              <Loader
                type="Oval"
                color="#5E5E5E"
                height={30}
                width={30}
              />
            :
              null
          }

        </Modal>
      
        : null 
      }
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    state: {
      ...state.ModalReducer,
      ...state.MenuReducer,
      ...state.UserReducer,
      ...state.AuthReducer
    }
  }
};

const mapDispatchToProps = {
  openRegisterModal: ModalActions.openRegisterModal,
  closeRegisterModal: ModalActions.closeRegisterModal,
  openLoginModal: ModalActions.openLoginModal,
  closeLoginModal: ModalActions.closeLoginModal,
  registerUser: AuthActions.registerUser,
  loginUser: AuthActions.loginUser,
  openMenu: MenuActions.openMenu,
  closeMenu: MenuActions.closeMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
