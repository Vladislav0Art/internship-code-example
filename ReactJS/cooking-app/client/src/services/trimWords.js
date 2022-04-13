const trimWords = (text, limit) => { 
  return text.split(' ').slice(0, limit + 1).join(' ') + ((text.split(' ').length > limit) ? '...' : '');
}

export default trimWords;