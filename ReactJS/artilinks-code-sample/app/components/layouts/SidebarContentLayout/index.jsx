import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// elements
import { Button } from '../../elements';
// modules
import {
	ProfilePreview, 
	DefaultCollections,
	GroupList
} from '../../modules';
// styles
import styles from './styles.module.scss';


import { useData } from '../../../hooks';



const SidebarContentLayout = ({ transitionIn }) => {
	const contentSidebarTransitionRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={contentSidebarTransitionRef}
			in={transitionIn}
			timeout={300 + 300} // transition-time + transition-delay
			classNames={{
				enter: styles.contentEnter,
				enterActive: styles.contentEnterActive,
				enterDone: styles.contentEnterDone,
				exit: styles.contentExit,
				exitActive: styles.contentExitActive,
				exitDone: styles.contentExitDone
			}}
		>
			<div
				ref={contentSidebarTransitionRef}
				className={styles.content}
			>
				
				<div className={styles.topPart}>
					<ProfilePreview onIconClick={() => console.log('Icon click')} />
					<DefaultCollections />
				</div>

				<div className={styles.groupButton}>
					<Button onClick={() => console.log('Create group')}>Add new group</Button>
				</div>
				
				<div className={styles.groupList}>
					<GroupList />
				</div>
			</div>
		</CSSTransition>
	);
};


// prop types
SidebarContentLayout.propTypes = {
	transitionIn: PropTypes.bool.isRequired
};


export default SidebarContentLayout;
