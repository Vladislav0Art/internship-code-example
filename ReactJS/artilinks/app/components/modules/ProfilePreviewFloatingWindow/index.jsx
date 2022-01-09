import React from 'react';
import PropTypes from 'prop-types';
// elements
import { FloatingWindowAction } from '../../elements';
// modules
import { FloatingWindow } from '../../modules';


const ProfilePreviewFloatingWindow = ({
	transitionIn,
	onSettings,
	onLogout
}) => {
	return (
		<FloatingWindow transitionIn={transitionIn}>
			<FloatingWindowAction onClick={onSettings}>
				<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.50648 3.52275L7.80145 3.43313C7.74332 3.25425 7.67169 3.08175 7.58807 2.91788L8.02346 2.35725C8.19972 2.13037 8.17909 1.81013 7.97771 1.61513L7.38706 1.0245C7.19017 0.82125 6.86991 0.801 6.64265 0.976875L6.08275 1.41225C5.91887 1.32862 5.74636 1.257 5.56711 1.19887L5.47748 0.495C5.44373 0.212625 5.20409 0 4.9202 0H4.08017C3.79628 0 3.55665 0.212625 3.5229 0.493875L3.43327 1.19887C3.25401 1.257 3.0815 1.32825 2.91762 1.41225L2.35735 0.976875C2.13084 0.801 1.81058 0.82125 1.61519 1.02262L1.02454 1.61287C0.821284 1.81013 0.800658 2.13038 0.976916 2.35763L1.41231 2.91788C1.32831 3.08175 1.25705 3.25425 1.19892 3.43313L0.495021 3.52275C0.212634 3.5565 0 3.79612 0 4.08V4.92C0 5.20388 0.212634 5.4435 0.493896 5.47725L1.19892 5.56687C1.25705 5.74575 1.32868 5.91825 1.41231 6.08212L0.976916 6.64275C0.800658 6.86963 0.821284 7.18988 1.02267 7.38488L1.61332 7.9755C1.81058 8.17838 2.13046 8.19862 2.35772 8.02275L2.918 7.58737C3.08188 7.67137 3.25439 7.743 3.43327 7.80075L3.5229 8.50425C3.55665 8.78737 3.79628 9 4.08017 9H4.9202C5.20409 9 5.44373 8.78738 5.47748 8.50613L5.56711 7.80112C5.74599 7.743 5.9185 7.67137 6.08238 7.58775L6.64303 8.02312C6.86991 8.19938 7.19017 8.17875 7.38518 7.97738L7.97583 7.38675C8.17909 7.1895 8.19972 6.86962 8.02346 6.64237L7.58807 6.08212C7.67207 5.91825 7.7437 5.74575 7.80145 5.56687L8.50498 5.47725C8.78737 5.4435 9 5.20388 9 4.92V4.08C9.00037 3.79612 8.78774 3.5565 8.50648 3.52275ZM4.50019 6.375C3.46627 6.375 2.62511 5.53387 2.62511 4.5C2.62511 3.46613 3.46627 2.625 4.50019 2.625C5.5341 2.625 6.37527 3.46613 6.37527 4.5C6.37527 5.53387 5.5341 6.375 4.50019 6.375Z" fill="#6A6A6A"/>
				</svg>
				<span>Settings</span>
			</FloatingWindowAction>
			<FloatingWindowAction onClick={onLogout}>
				<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.65381 2.10937V1.40625C2.65381 0.630821 3.28463 0 4.06006 0H7.59326C8.36869 0 8.99951 0.630821 8.99951 1.40625L8.99951 7.59375C8.99951 8.36918 8.36869 9 7.59326 9H4.06006C3.28463 9 2.65381 8.36918 2.65381 7.59375V6.89062C2.65381 6.69644 2.81119 6.53906 3.00537 6.53906C3.19955 6.53906 3.35693 6.69644 3.35693 6.89062V7.59375C3.35693 7.98143 3.67238 8.29688 4.06006 8.29688H7.59326C7.98094 8.29688 8.29639 7.98143 8.29639 7.59375V1.40625C8.29639 1.01857 7.98094 0.703125 7.59326 0.703125H4.06006C3.67238 0.703125 3.35693 1.01857 3.35693 1.40625V2.10937C3.35693 2.30356 3.19955 2.46094 3.00537 2.46094C2.81119 2.46094 2.65381 2.30356 2.65381 2.10937ZM0.256935 5.1039L1.04417 5.89114C1.1815 6.02847 1.40411 6.02847 1.54137 5.89114C1.6787 5.75388 1.6787 5.53127 1.54137 5.39401L0.981415 4.83398H5.20264C5.39682 4.83398 5.5542 4.67661 5.5542 4.48242C5.5542 4.28824 5.39682 4.13086 5.20264 4.13086H0.981415L1.54137 3.57083C1.6787 3.43357 1.6787 3.21096 1.54137 3.0737C1.47271 3.00504 1.38276 2.9707 1.29281 2.9707C1.20279 2.9707 1.11284 3.00504 1.04417 3.0737L0.256935 3.86094C-0.0857697 4.20364 -0.0857697 4.7612 0.256935 5.1039V5.1039Z" fill="#6A6A6A"/>
				</svg>
				<span>Logout</span>
			</FloatingWindowAction>
		</FloatingWindow>
	);
};


// prop types
ProfilePreviewFloatingWindow.propTypes = {
	transitionIn: PropTypes.bool.isRequired,	
	onSettings: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
};


export default ProfilePreviewFloatingWindow;