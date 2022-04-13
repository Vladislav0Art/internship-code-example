import React from 'react';
import PropTypes from 'prop-types';
// components
import { Input } from '../../index';
// styles
import './Item.scss';
import './Item-media.scss';


const Item = (props) => {
  const item = props.item;

	// local button component
	const Button = ({ children, onClick = () => {} }) => (
		<button type="button" className="item__btn" onClick={onClick}>
			{ children }
		</button>
	)

	// updating item
	const inputHandler = () => {
		const value = document.getElementById(`item-input-${item.id}`).value;
		props.updateItem(item.id, value);
	};

  return (
    <div className="item">
      <div className="item__block">
        {
          !item.isEditing ? 
            <span className="item__text">{ item.text }</span>
          :
            <Input value={item.text} type="text" name="text" id={`item-input-${item.id}`} classNames={['item__input']} />
        }
      </div>

      <div className="item__icons">
        {
          !item.isEditing ? 
            (
							<Button onClick={() => props.editItem(item.id)}>
								<i className="item__icon item__icon-edit fas fa-edit"></i>
							</Button>
            )
          :
            (
							<Button onClick={inputHandler}>
								<i className="item__icon item__icon-check fas fa-check"></i>
							</Button>
            )
        }

				<Button onClick={() => props.deleteItem(item.id)}>
					<i className="item__icon item__icon-trash fas fa-trash-alt"></i>
				</Button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default Item;
