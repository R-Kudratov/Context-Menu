import './styles.css'
import { ContextMenu } from './menu';

const menu = new ContextMenu('#menu');
document.addEventListener('contextmenu', event => {
  event.preventDefault();
  const { pageX, pageY } = event;
  menu.open(pageX, pageY);
});
